import React from "react";

import "./movie-card.scss";

import { Link } from "react-router-dom";

import Button from "../button/Button";
import AddButton from "../button/AddButton";

import { category } from "../../api/tmdbApi";
import apiConfig from "../../api/apiConfig";

const MovieCard = (props) => {
  const item = props.item;

  const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div>
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <Link to={link}>
            <Button>
              <i className="bx bx-play"></i>
            </Button>
          </Link>
          <AddButton item={item} />
        </div>
        <h3>{item.title || item.name}</h3>
      </div>
    </Link>
  );
};

export default MovieCard;
