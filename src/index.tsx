import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Link, Route } from "react-router-dom";

import Home from "./components/home";
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
      <Router>
        <React.Fragment>
          <Route exact={true} path="/" component={Home} />
          <Route path="/match" component={Match} />
        </React.Fragment>
      </Router>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
