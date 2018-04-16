import { get } from "lodash";

const initialState: TPlayer = {
  activeActorId: null,
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
    default: {
      return state;
    }
  }
}
