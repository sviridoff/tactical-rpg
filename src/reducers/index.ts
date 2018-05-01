import { combineReducers } from "redux";

import { actors } from "./actors";
import { player } from "./player";
import { tilemap } from "./tilemap";

const appReducer = combineReducers({ actors, tilemap, player });

export default (state: TState, action: any) => {
  if (action.type === "RESTART_GAME") {
    state = undefined;
  }

  return appReducer(state, action);
};
