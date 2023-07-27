import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import axios from "../../api/axios";

const DetailPage = () => {
  const { movieID } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`/movie/${movieID}`);
      console.log("DetailPage", response);
      setMovie(response.data);
    };

    fetchData();
  }, [movieID]);

  if (!movie) return <div>Loading...</div>;

  return (
    <section>
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.name}
        className="modal__poster"
      />
    </section>
  );
};

export default DetailPage;
