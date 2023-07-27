import React, { useCallback, useEffect, useState } from "react";

import "./Row.css";
import axios from "../api/axios";

const Row = ({ category, id, requestURL, large }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(requestURL);
      console.log("row", response);
      setContents(response.data.results);
    };

    fetchData();
  }, [requestURL]);

  const handleScrollLeft = useCallback(() => {
    document.getElementById(id).scrollLeft -= window.innerWidth - 80;
  }, [id]);
  const handleScrollRight = useCallback(() => {
    document.getElementById(id).scrollLeft += window.innerWidth - 80;
  }, [id]);

  return (
    <section className="row">
      <h2>{category}</h2>

      <div className="slider">
        <div className="slider__arrow-left">
          <span className="slider__arrow" onClick={handleScrollLeft}>
            {"<"}
          </span>
        </div>

        <div id={id} className="posters">
          {contents.map((content) => (
            <img
              key={content.id}
              className={`poster ${large && "poster-large"}`}
              src={`https://image.tmdb.org/t/p/original/${
                large ? content.poster_path : content.backdrop_path
              }`}
              alt={content.name}
            />
          ))}
        </div>

        <div className="slider__arrow-right">
          <span className="slider__arrow" onClick={handleScrollRight}>
            {">"}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Row;
