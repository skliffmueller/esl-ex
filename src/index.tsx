import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import axiosMiddleware from "./middlewares/axios";

import { App } from "./App";

import { rootReducer } from "./store";

const store = createStore(rootReducer, composeWithDevTools(
  applyMiddleware(
    axiosMiddleware,
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
