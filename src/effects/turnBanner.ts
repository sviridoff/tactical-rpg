import delay from "delay";
import { hidePlayerTurnBanner, showPlayerTurnBanner } from "../actions/index";

export default async function turnBanner(dispatch: TDispatch) {
  dispatch(showPlayerTurnBanner());

  await delay(1500);

  dispatch(hidePlayerTurnBanner());
}
