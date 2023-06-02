import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AppWrapper } from "./context/context";
import { GlobalProvider } from "./context/GlobalState";

ReactDOM.render(
  <React.StrictMode>
    <AppWrapper>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </AppWrapper>
  </React.StrictMode>,
  document.getElementById("root")
);
