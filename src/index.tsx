import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Match from "./components/match";
import { matchLoop } from "./effects/match";
import store from "./store";

if (process.env.NODE_ENV !== "production") {
  // Too many warnings at the moment. It need be refactored farther.
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

function App() {
  return (
    <Provider store={store}>
      <Match />
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
