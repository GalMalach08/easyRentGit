import React, { Suspence } from "react";
import ReactDOM from "react-dom";
import Routes from "./Routes";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import ReduxStore from "./store/index";
import "./utils/translator";
import { Loader } from "./utils/tools";
ReactDOM.render(
  <React.Suspense fallback={<Loader />}>
    <Provider store={ReduxStore()}>
      <Routes />
    </Provider>
  </React.Suspense>,
  document.getElementById("root")
);
