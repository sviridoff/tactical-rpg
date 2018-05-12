import delay from "delay";
import { hideMatchEndBanner, showMatchEndBanner } from "../actions/index";

export default async function matchEndBanner(dispatch: TDispatch) {
  dispatch(showMatchEndBanner());

  await delay(1500);

  dispatch(hideMatchEndBanner());
}
