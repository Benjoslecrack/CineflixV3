import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppWrapper } from "./context/context";

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper>
      <App />
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
