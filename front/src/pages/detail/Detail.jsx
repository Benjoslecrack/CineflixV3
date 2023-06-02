import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppContext } from "../../context/context";
import { useHistory } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

import "./detail.scss";
import CastList from "./CastList";
import VideoList from "./VideoList";
import Button from "../../components/button/Button";

import MovieList from "../../components/movie-list/MovieList";
import { GlobalContext } from "../../context/GlobalState";

const Detail = () => {
  const { category, id } = useParams();

  const { sharedState } = useAppContext();
  const history = useHistory();

  const { addMovieToWatchlist } = useContext(GlobalContext);

  const [item, setItem] = useState(null);

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(category, id, { params: {} });
      setItem(response);
      window.scrollTo(0, 0);
    };
    getDetail();
  }, [category, id]);

  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiConfig.originalImage(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiConfig.originalImage(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">
                      {genre.name}
                    </span>
                  ))}
              </div>
              <p className="overview">{item.overview}</p>
              <div className="add-watchlist">
                <Button className="btn-green" onClick={() => addMovieToWatchlist(item)}>
                  <i className="bx bx-plus"></i>
                </Button>
                <h2>Ajouter à votre Watchlist</h2>
              </div>
              <div className="cast">
                <div className="section__header">
                  <h2>Casting</h2>
                </div>
                <CastList id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Contenu similaire</h2>
              </div>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Detail;
