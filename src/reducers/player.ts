import { get } from "lodash-es";

const initialState: TPlayer = {
  activeActorId: null,
  isPlayerTurn: true,
  selectedActorId: null,
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
    default: {
      return state;
    }
  }
}
