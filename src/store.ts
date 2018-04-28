import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import * as reducers from "./reducers/index";

let middleware = [thunk];
if (process.env.NODE_ENV !== "production") {
  const { default: logger } = require("redux-logger");
  middleware = [...middleware, logger];
}

const store = createStore(
  combineReducers(reducers),
  applyMiddleware(...middleware),
);

(window as any).store = store;

export default store;
