import React, { useCallback, useEffect, useState } from "react";

import "./Nav.css";

const Nav = () => {
  const [isAtTheTop, setIsAtTheTop] = useState(true);

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
    window.location.reload();
  }, []);

  return (
    <nav className={`nav ${!isAtTheTop && "nav__black"}`}>
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
        alt="Netflix 2015 logo"
        className="nav__logo"
        onClick={handleReload}
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
