import React, { useCallback, useEffect, useState } from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Row.css";
import axios from "../api/axios";
import ContentsModal from "./ContentsModal";

const Row = ({ category, id, requestURL, large }) => {
  const [contents, setContents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState({});

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
  const handleClickContent = useCallback(
    (content) => () => {
      setSelected(content);
      setIsModalOpen(true);
    },
    []
  );

  return (
    <section className="row">
      <h2>{category}</h2>

      {/* <div className="slider"> */}
      {/* <div className="slider__arrow-left">
          <span className="slider__arrow" onClick={handleScrollLeft}>
            {"<"}
          </span>
        </div> */}

      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          1378: {
            slidesPerView: 6,
            slidesPerGroup: 6,
          },
          998: {
            slidesPerView: 5,
            slidesPerGroup: 5,
          },
          625: {
            slidesPerView: 4,
            slidesPerGroup: 4,
          },
          0: {
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
      >
        <div id={id} className="posters">
          {contents.map((content) => (
            <SwiperSlide>
              <img
                key={content.id}
                style={{ padding: "25px 0" }}
                className={`poster ${large && "poster-large"}`}
                src={`https://image.tmdb.org/t/p/original/${
                  large ? content.poster_path : content.backdrop_path
                }`}
                alt={content.name}
                onClick={handleClickContent(content)}
              />
            </SwiperSlide>
          ))}
        </div>
      </Swiper>
      {/* <div className="slider__arrow-right">
          <span className="slider__arrow" onClick={handleScrollRight}>
            {">"}
          </span>
        </div> */}
      {/* </div> */}

      {isModalOpen && (
        <ContentsModal {...selected} setIsModalOpen={setIsModalOpen} />
      )}
    </section>
  );
};

export default Row;
