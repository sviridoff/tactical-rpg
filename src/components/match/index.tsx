
import React, { Component } from "react";

import Actors from "../../containers/Actors";
import BattleEndBanner from "../../containers/BattleEndBanner";
import Profile from "../../containers/Profile";
import Tilemap from "../../containers/Tilemap";
import TurnBanner from "../../containers/TurnBanner";
import { matchLoop } from "../../effects/match";
import store from "../../store";

const styles = require("./index.css");

class Match extends Component {
  public componentDidMount() {
    matchLoop(store.dispatch, store.getState);
  }

  public render() {
    return (
      <div className={styles.main}>
        <Profile />
        <div className={styles.body}>
          <Actors />
          <Tilemap />
          <TurnBanner />
          <BattleEndBanner />
        </div>
      </div>
    );
  }
}

export default Match;
