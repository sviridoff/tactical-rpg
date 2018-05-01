import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Actors from "./containers/Actors";
import GameRestartButton from "./containers/GameRestartButton";
import Profile from "./containers/Profile";
import Tilemap from "./containers/Tilemap";
import TurnBanner from "./containers/TurnBanner";
import showTurnBanner from "./effects/showTurnBanner";
import store from "./store";

class App extends Component {
  public componentDidMount() {
    // A weird way to show turn banner.
    (async () => {
      await showTurnBanner(store.dispatch);
    })();
  }

  public render() {
    const rootStyle: any = {
      float: "left",
    };
    const style: any = {
      float: "left",
      position: "relative",
    };

    return (
      <Provider store={store}>
        <div style={rootStyle}>
          <div style={style}>
            <Actors />
            <Tilemap />
            <TurnBanner />
          </div>
          <GameRestartButton />
          <Profile />
        </div>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
