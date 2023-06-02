import React, { useContext } from "react";
import Button from "../button/Button";

import { useHistory } from "react-router-dom";

import { useAppContext } from "../../context/context";
import { GlobalContext } from "../../context/GlobalState";

import "./add-button.scss";

export default function SeeButton(props) {
  const item = props.item;

  const { addMovieToWatched } = useContext(GlobalContext);

  const { sharedState } = useAppContext();

  const history = useHistory();

  const redirectToLoginPage = () => {
    history.push("/auth/login");
  };

  return (
    <Button
      className="btn-green"
      onClick={
        sharedState.user !== null
          ? () => addMovieToWatched(item)
          : redirectToLoginPage
      }
    >
      <i className="bx bx-hide"></i>
    </Button>
  );
}
