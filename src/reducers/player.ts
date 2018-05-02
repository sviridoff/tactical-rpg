import produce from "immer";
import { get } from "lodash-es";

const initialState: TPlayer = {
  activeActorId: null,
  isBattleWon: false,
  isPlayerTurn: true,
  selectedActorId: null,
  showBattleEndBanner: false,
  showTurnBanner: false,
};

export function player(state = initialState, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "UPDATE_PLAYER_ACTIVE_ACTOR_ID": {
        draft.activeActorId = get(action, "data.actor.id");

        break;
      }
      case "UPDATE_PLAYER_SELECTED_ACTOR_ID": {
        draft.selectedActorId = get(action, "data.actor.id");

        break;
      }
      case "DISABLE_PLAYER_IS_PLAYER_TURN": {
        draft.isPlayerTurn = false;

        break;
      }
      case "ENABLE_PLAYER_IS_PLAYER_TURN": {
        draft.isPlayerTurn = true;

        break;
      }
      case "SHOW_PLAYER_TURN_BANNER": {
        draft.showTurnBanner = true;

        break;
      }
      case "HIDE_PLAYER_TURN_BANNER": {
        draft.showTurnBanner = false;

        break;
      }
      case "PLAYER_WIN": {
        draft.isBattleWon = true;

        break;
      }
      case "PLAYER_LOSE": {
        draft.isBattleWon = false;

        break;
      }
      case "SHOW_PLAYER_BATTLE_END_BANNER": {
        draft.showBattleEndBanner = true;

        break;
      }
      case "HIDE_PLAYER_BATTLE_END_BANNER": {
        draft.showBattleEndBanner = false;

        break;
      }
    }
  });
}
