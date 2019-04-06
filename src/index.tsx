import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import thunk from "redux-thunk";

import axios from "axios";
import axiosMiddleware from "redux-axios-middleware";

import { App } from "./App";

import { rootReducer } from "./store";

const client = axios.create({
  baseURL: "http://localhost:8080/api",
  responseType: "json",
});

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    thunk,
    axiosMiddleware(client),
  ),
));

ReactDOM.render(
  (
    <Provider store={store}>
      <App />
    </Provider>
  ),
  document.getElementById("root"),
);
