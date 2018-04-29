import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import * as reducers from "./reducers/index";

let middlewares;

if (process.env.NODE_ENV !== "production") {
  const { default: logger } = require("redux-logger");
  const { composeWithDevTools } = require("redux-devtools-extension");

  middlewares = composeWithDevTools(applyMiddleware(thunk, logger));
} else {
  middlewares = applyMiddleware(thunk);
}

const store = createStore(combineReducers(reducers), middlewares);

(window as any).store = store;

export default store;
