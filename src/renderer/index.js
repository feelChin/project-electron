import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import Routes from "@router";

import { RootProvider } from "@util/useRootContext/rootProvider";
import "@style/index.scss";

const root = ReactDOM.createRoot(document.querySelector(".root"));

root.render(
  <HashRouter>
    <RootProvider>
      <Routes />
    </RootProvider>
  </HashRouter>
);
