import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";

import Actors from "./containers/Actors";
import Profile from "./containers/Profile";
import Tilemap from "./containers/Tilemap";
import TurnBanner from "./containers/TurnBanner";
import store from "./store";

const App = () => {
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
        <Profile />
      </div>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
