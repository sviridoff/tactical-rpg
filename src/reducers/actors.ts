import * as clone from "clone";

import Actor from "../models/Actors";

const teams: any = [
  {
    positions: [[2, 2], [3, 3], [5, 1]],
    teamName: "A",
  },
  {
    positions: [[2, 4], [5, 2], [5, 5]],
    teamName: "B",
  },
];
const initialState: TActors = new Actor(teams).get();

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
    case "ATTACK_ENEMY_ACTOR": {
      const stateClone = clone(state);
      const actor = stateClone[action.data.actor.id];
      const enemyActor = stateClone[action.data.enemyActor.id];

      enemyActor.healthPoints -= actor.damage;

      if (enemyActor.healthPoints <= 0) {
        enemyActor.isDead = true;
      }

      return stateClone;
    }
    default: {
      return state;
    }
  }
}
