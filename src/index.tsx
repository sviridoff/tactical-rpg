import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Actors from "./containers/Actors";
import BattleEndBanner from "./containers/BattleEndBanner";
import Profile from "./containers/Profile";
import Tilemap from "./containers/Tilemap";
import TurnBanner from "./containers/TurnBanner";
import { matchLoop } from "./effects/match";
import store from "./store";

const styles = require("./index.css");

if (process.env.NODE_ENV !== "production") {
  // Too many warnings at the moment. It need be refactored farther.
  const { whyDidYouUpdate } = require("why-did-you-update");
  whyDidYouUpdate(React);
}

class App extends Component {
  public componentDidMount() {
    matchLoop(store.dispatch, store.getState);
  }

  public render() {
    return (
      <Provider store={store}>
        <div className={styles.main}>
          <Profile />
          <div className={styles.body}>
            <Actors />
            <Tilemap />
            <TurnBanner />
            <BattleEndBanner />
          </div>
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
