import React, { useCallback } from "react";

import "./ContentsModal.css";

const ContentsModal = ({
  backdrop_path,
  title,
  overview,
  name,
  release_date,
  first_air_date,
  vote_average,
  setIsModalOpen,
}) => {
  const handleClose = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <div className="presentation">
      <div className="modal-wrapper">
        <div className="modal">
          <span className="modal__close" onClick={handleClose}>
            X
          </span>

          <img
            className="modal__poster"
            src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
            alt={name}
          />

          <div className="modal__content">
            <p className="modal__details">
              <span className="modal__percentage">100% for you</span>
              {release_date || first_air_date}
            </p>

            <h2 className="modal__title">{title || name}</h2>

            <p className="modal__overview">평점 : {vote_average}</p>

            <p className="modal__overview">{overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentsModal;
