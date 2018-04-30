import Timeout from "await-timeout";
import {
  enableAllActors,
  enablePlayerIsPlayerTurn,
  hidePlayerTurnBanner,
  showPlayerTurnBanner,
} from "../actions/index";

function showTurnBanner(dispatch: TDispatch) {
  const timeout = new Timeout();

  return Promise.resolve()
    .then(() => {
      dispatch(showPlayerTurnBanner());

      return timeout.set(1500);
    })
    .then(() => {
      timeout.clear();

      dispatch(hidePlayerTurnBanner());
    });
}

export function updateEnemyActor(dispatch: TDispatch, getState: TGetState) {
  const timeout = new Timeout();

  Promise.resolve()
    .then(() => {
      return showTurnBanner(dispatch);
    })
    .then(() => {
      // enemy stuff

      return timeout.set(4000);
    })
    .then(() => {
      timeout.clear();

      dispatch(enablePlayerIsPlayerTurn());
    })
    .then(() => {
      return showTurnBanner(dispatch);
    })
    .then(() => {
      dispatch(enableAllActors());
    });
}
