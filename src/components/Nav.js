import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Nav.css";

const Nav = () => {
  const [isAtTheTop, setIsAtTheTop] = useState(true);
  const [searchWord, setSearchWord] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY < 50) {
        setIsAtTheTop(true);
      } else {
        setIsAtTheTop(false);
      }
    });

    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  const handleReload = useCallback(() => {
    // window.location.reload();
    navigate("/");
  }, [navigate]);
  const handleChangeInput = useCallback(
    (e) => {
      setSearchWord(e.target.value);
      navigate(`/search?word=${e.target.value}`);
    },
    [navigate]
  );

  return (
    <nav className={`nav ${!isAtTheTop && "nav__black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix 2015 logo"
        className="nav__logo"
        onClick={handleReload}
      />

      <input
        value={searchWord}
        onChange={handleChangeInput}
        className="nav__input"
        type="text"
        placeholder="콘텐츠를 검색해주세요."
      />

      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
        alt="Netflix avatar"
        className="nav__avatar"
      />
    </nav>
  );
};

export default Nav;
