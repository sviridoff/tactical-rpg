import { enableAllActors, enablePlayerIsPlayerTurn } from "../actions/index";

export function updateEnemyActor(dispatch: TDispatch, getState: TGetState) {
  setTimeout(() => {
    dispatch(enablePlayerIsPlayerTurn());
    dispatch(enableAllActors());
  }, 4000);
}
