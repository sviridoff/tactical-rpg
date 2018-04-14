import * as clone from "clone";
import { times } from "lodash";
import { v4 as uuidv4 } from "uuid";

const initialState: TActors = {};
const positions = [[2, 2], [3, 3], [6, 6]];

times(3, (index) => {
  const id = uuidv4();
  const [x, y] = positions[index];

  initialState[id] = {
    currentPosition: { x, y },
    id,
    originalPosition: { x, y },
  };
});

export function actors(state = initialState, action: any) {
  switch (action.type) {
    case "UPDATE_ACTOR_CURRENT_POSITION": {
      const stateClone = clone(state);
      const { id, x, y } = action.data;

      stateClone[id] = {
        ...stateClone[id],
        currentPosition: { x, y },
      };

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
