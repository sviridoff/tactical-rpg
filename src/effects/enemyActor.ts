import delay from "delay";
import { enableAllActors, enablePlayerIsPlayerTurn } from "../actions/index";
import showTurnBanner from "./showTurnBanner";

export function updateEnemyActor(dispatch: TDispatch, getState: TGetState) {
  (async () => {
    await showTurnBanner(dispatch);

    // Enemy behaviour stuff.
    await delay(4000);

    dispatch(enablePlayerIsPlayerTurn());

    await showTurnBanner(dispatch);

    dispatch(enableAllActors());
  })();
}
