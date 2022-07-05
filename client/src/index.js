import React, { Suspence } from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import ReduxStore from "./store/index";
import "./utils/translator";

ReactDOM.render(
  <Provider store={ReduxStore()}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
