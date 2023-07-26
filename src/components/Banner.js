import React, { useEffect, useMemo, useState } from "react";

import "./Banner.css";
import axios from "../api/axios";
import requests from "../api/requests";

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await axios.get(requests.NOW_PLAYING_MOVIES);
    const movieID =
      response.data.results[
        Math.floor(Math.random() * response.data.results.length)
      ].id;
    const { data } = await axios.get(`/movie/${movieID}`, {
      params: { append_to_response: "videos" },
    });
    console.log(data);
    setMovie(data);
  };

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
        backgroundPosition: "top center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">{movie.title || movie.original_title}</h1>
        <div className="banner__button-group">
          <button className="banner__button play">재생</button>
          <button className="banner__button more-info">상세 정보</button>
        </div>
        <h1 className="banner__overview">{truncate(movie.overview, 100)}</h1>
      </div>

      <div className="banner__bottom" />
    </header>
  );
};

export default Banner;
