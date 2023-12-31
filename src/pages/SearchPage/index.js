import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import "./SearchPage.css";
import axios from "../../api/axios";
import useDebounce from "../../hooks/useDebounce";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const navigate = useNavigate();

  const searchWord = new URLSearchParams(useLocation().search).get("word");
  const debouncedSearchWord = useDebounce(searchWord, 500);

  useEffect(() => {
    if (!debouncedSearchWord) return;

    fetchData(debouncedSearchWord);
  }, [debouncedSearchWord]);

  const fetchData = async (word) => {
    try {
      const response = await axios.get(
        `/search/multi?include_adult=false&query=${word}`
      );
      console.log("search", response);
      setSearchResults(response.data.results);
    } catch (err) {
      console.log(err);
    }
  };

  const handleMoreInfo = useCallback(
    (id) => () => {
      navigate(`/${id}`);
    },
    [navigate]
  );

  return (
    <>
      {searchResults.length > 0 ? (
        <section className="results">
          {searchResults.map((result) => {
            if (!result.backdrop_path || result.media_type === "person")
              return null;

            return (
              <div key={result.id} className="results__content">
                <div
                  className="results__poster"
                  onClick={handleMoreInfo(result.id)}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${result.backdrop_path}`}
                    alt={result.name}
                    className="results__poster-img"
                  />
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="no-results">
          <div className="no-results__text">
            <p>
              찾고자 하는 검색어 "{debouncedSearchWord}"에 맞는 컨텐츠가
              없습니다.
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchPage;
