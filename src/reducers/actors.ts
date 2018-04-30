import clone from "clone";

import Actor from "../models/Actors";

const teams: any = [
  {
    isEnemy: false,
    positions: [[2, 2]],
  },
  {
    isEnemy: true,
    positions: [[5, 2]],
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
    case "UPDATE_ACTOR_ATTACK_TARGET": {
      const stateClone = clone(state);
      const actor = stateClone[action.data.actor.id];
      const enemyActor = stateClone[action.data.enemyActor.id];

      actor.isGoingToAttack = true;
      enemyActor.isGoingToBeAttacked = true;

      return stateClone;
    }
    case "FLUSH_ACTORS_ATTACK_TARGET": {
      const stateClone = clone(state);

      Object.keys(stateClone).forEach((key) => {
        stateClone[key].isGoingToBeAttacked = false;
        stateClone[key].isGoingToAttack = false;
      });

      return stateClone;
    }
    case "DISABLE_ACTOR": {
      const stateClone = clone(state);
      const actor = stateClone[action.data.actor.id];

      actor.isDisable = true;

      return stateClone;
    }
    case "ENABLE_ALL_ACTORS": {
      const stateClone = clone(state);

      Object.keys(stateClone).forEach((key) => {
        stateClone[key].isDisable = false;
      });

      return stateClone;
    }
    default: {
      return state;
    }
  }
}
