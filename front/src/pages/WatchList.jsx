import React, { useContext } from "react";

import PageHeader from "../components/page-header/PageHeader";
import { GlobalContext } from "../context/GlobalState";
import WatchListMovieCard from "../components/movie-card/WatchListMovieCard.jsx";

export default function WatchList() {
  const { watchlist } = useContext(GlobalContext);

  return (
    <>
      <PageHeader> WatchList </PageHeader>
      <div className="container watchlist">
        <div className="section mb-3">
          {watchlist.length === 0 ? (
            <h2>Ajoutez des films et séries à votre Watchlist !</h2>
          ) : (
            <>
              <h2 style={{marginBottom: "1rem"}}>Les films et séries que vous voulez regarder</h2>
              <div className="movie-grid">
                {watchlist.map((item, i) => (
                  <WatchListMovieCard item={item} key={i} category="watchlist" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
