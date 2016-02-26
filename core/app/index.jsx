require("./style/main.scss");

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, browserHistory } from "react-router";
import promise from "redux-promise";

import reducers from "./reducers";
import routes from "./routes";

var socket = io("http://localhost:8888");

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>, document.querySelector(".root"));
