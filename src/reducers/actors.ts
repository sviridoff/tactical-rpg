import * as clone from "clone";

import Actor from "../models/Actors";

const teams: any = [
  {
    positions: [[2, 2], [3, 3], [6, 6]],
    teamName: "A",
  },
  {
    positions: [[2, 4], [5, 2], [5, 7]],
    teamName: "B",
  },
];
const initialState = new Actor(teams).get();

export function actors(state = initialState, action: any) {
  switch (action.type) {
    case "UPDATE_ACTOR_CURRENT_POSITION": {
      const stateClone = clone(state);
      const { id } = action.data.actor;
      const { x, y } = action.data.tile;
      const actor = stateClone[id];

      actor.currentPosition = { x, y };

      return stateClone;
    }
    case "UPDATE_ACTOR_ORIGINAL_POSITION": {
      const stateClone = clone(state);
      const { id } = action.data.actor;
      const actor = stateClone[id];

      actor.originalPosition = actor.currentPosition;

      return stateClone;
    }
    default: {
      return state;
    }
  }
}
