import React, { useEffect, useState } from "react";

import "./Row.css";
import axios from "../api/axios";

const Row = ({ category, id, requestURL, large }) => {
  const [contents, setContents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requestURL);
    console.log("row", response);
    setContents(response.data.results);
  };

  return (
    <section className="row">
      <h2>{category}</h2>

      <div className="slider">
        <div className="slider__arrow-left">
          <span className="slider__arrow">{"<"}</span>
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
          <span className="slider__arrow">{">"}</span>
        </div>
      </div>
    </section>
  );
};

export default Row;
