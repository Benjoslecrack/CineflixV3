import React, { useContext } from "react";
import Button from "../button/Button";

import { useHistory } from "react-router-dom";

import { useAppContext } from "../../context/context";
import { GlobalContext } from "../../context/GlobalState";

import "./add-button.scss";

export default function DeleteButton(props) {
  const index = props.index;
  const category = props.category;

  const { removeMovieFromWatchlist, removeFromWatched } = useContext(
    GlobalContext
  );

  const { sharedState } = useAppContext();

  const history = useHistory();

  const redirectToLoginPage = () => {
    history.push("/auth/login");
  };

  if (category === "watchlist") {
    return (
      <Button
        className="btn"
        onClick={
          sharedState.user !== null
            ? () => removeMovieFromWatchlist(index)
            : redirectToLoginPage
        }
      >
        <i className="bx bx-trash"></i>
      </Button>
    );
  }

  if (category === "watched") {
    return (
      <Button
        className="btn btn-delete"
        onClick={
          sharedState.user !== null
            ? () => removeFromWatched(index)
            : redirectToLoginPage
        }
      >
        <i className="bx bx-trash"></i>
      </Button>
    );
  }
}
