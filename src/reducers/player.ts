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
  switch (action.type) {
    case "UPDATE_PLAYER_ACTIVE_ACTOR_ID": {
      const activeActorId = get(action, "data.actor.id");

      return { ...state, activeActorId };
    }
    case "UPDATE_PLAYER_SELECTED_ACTOR_ID": {
      const selectedActorId = get(action, "data.actor.id");

      return { ...state, selectedActorId };
    }
    case "DISABLE_PLAYER_IS_PLAYER_TURN": {
      return { ...state, isPlayerTurn: false };
    }
    case "ENABLE_PLAYER_IS_PLAYER_TURN": {
      return { ...state, isPlayerTurn: true };
    }
    case "SHOW_PLAYER_TURN_BANNER": {
      return { ...state, showTurnBanner: true };
    }
    case "HIDE_PLAYER_TURN_BANNER": {
      return { ...state, showTurnBanner: false };
    }
    case "PLAYER_WIN": {
      return { ...state, isBattleWon: true };
    }
    case "PLAYER_LOSE": {
      return { ...state, isBattleWon: false };
    }
    case "SHOW_PLAYER_BATTLE_END_BANNER": {
      return { ...state, showBattleEndBanner: true };
    }
    case "HIDE_PLAYER_BATTLE_END_BANNER": {
      return { ...state, showBattleEndBanner: false };
    }
    default: {
      return state;
    }
  }
}
