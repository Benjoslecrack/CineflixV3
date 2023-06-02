import React, { useContext } from "react";

import PageHeader from "../components/page-header/PageHeader";
import { GlobalContext } from "../context/GlobalState";
import WatchListMovieCard from "../components/movie-card/WatchListMovieCard.jsx";

export default function WatchedList() {
  const { watched } = useContext(GlobalContext);

  return (
    <>
      <PageHeader> Films et séries vues </PageHeader>
      <div className="container watchlist">
        <div className="section mb-3">
          {watched.length === 0 ? (
            <h2>Ajoutez des films et séries à vos vues !</h2>
          ) : (
            <>
              <h2 style={{marginBottom: "1rem"}}>Les films et séries que vous avez vus</h2>
              <div className="movie-grid">
                {watched.map((item, i) => (
                  <WatchListMovieCard item={item} key={i} category="watched" />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
