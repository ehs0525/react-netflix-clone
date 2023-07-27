import React, { useCallback, useEffect, useState } from "react";
import { styled } from "styled-components";

import "./Banner.css";
import axios from "../api/axios";
import requests from "../api/requests";

const Banner = () => {
  const [movie, setMovie] = useState({});
  const [isPlayClicked, setIsPlayClicked] = useState(false);

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
    console.log("banner", data);
    setMovie(data);
  };

  const handleClickPlay = useCallback(() => {
    setIsPlayClicked(true);
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.substr(0, n - 1) + "..." : str;

  if (isPlayClicked) {
    return (
      <Container>
        <HomeContainer>
          <Iframe
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}
            title="YouTube video player"
            frameborder="0"
            allow="autoplay; fullscreen"
            allowfullscreen
          ></Iframe>
        </HomeContainer>
      </Container>
    );
  } else {
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
          <h1 className="banner__title">
            {movie.title || movie.original_title}
          </h1>
          <div className="banner__button-group">
            <button className="banner__button play" onClick={handleClickPlay}>
              재생
            </button>
            <button className="banner__button more-info">상세 정보</button>
          </div>
          <h1 className="banner__overview">{truncate(movie.overview, 100)}</h1>
        </div>

        <div className="banner__bottom" />
      </header>
    );
  }
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
`;
const Iframe = styled.iframe`
  width: 100%;
  height: 100%;
  z-index: -1;
  opacity: 0.65;
  border: none;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export default Banner;
