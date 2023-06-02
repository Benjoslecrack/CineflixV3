import React from "react";

import "./movie-card.scss";

import DeleteButton from "../button/DeleteButton";
import SeeButton from "../button/SeeButton";

import apiConfig from "../../api/apiConfig";

const WatchListMovieCard = (props) => {
  const item = props.item;
  const category = props.category;

//   const link = "/" + category[props.category] + "/" + item.id;

  const bg = apiConfig.w500Image(item.poster_path || item.backdrop_path);

  return (
    <div>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <DeleteButton index={item.id} category={category} />
        {category === "watchlist" ? (
          <SeeButton item={item} category={category} />
        ) : (
          <></>
        )}
      </div>
      <h3>{item.title || item.name}</h3>
    </div>
  );
};

export default WatchListMovieCard;
