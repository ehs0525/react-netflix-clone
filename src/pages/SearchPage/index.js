import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import "./SearchPage.css";
import axios from "../../api/axios";

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const searchWord = new URLSearchParams(useLocation().search).get("word");

  useEffect(() => {
    if (!searchWord) return;

    fetchData(searchWord);
  }, [searchWord]);

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

  return (
    <>
      {searchResults.length > 0 ? (
        <section className="results">
          {searchResults.map((result) => {
            if (!result.backdrop_path || result.media_type === "person")
              return null;

            return (
              <div key={result.id} className="results__content">
                <div className="results__poster">
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
            <p>찾고자 하는 검색어 "{searchWord}"에 맞는 컨텐츠가 없습니다.</p>
          </div>
        </section>
      )}
    </>
  );
};

export default SearchPage;
