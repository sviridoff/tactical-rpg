import produce from "immer";
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
  return produce(state, (draft) => {
    switch (action.type) {
      case "UPDATE_ACTOR_CURRENT_POSITION": {
        const { id } = action.data.actor;
        const { x, y } = action.data.tile;
        const actor = draft[id];

        actor.currentPosition = { x, y };

        break;
      }
      case "UPDATE_ACTOR_ORIGINAL_POSITION": {
        const { id } = action.data.actor;
        const actor = draft[id];

        actor.originalPosition = actor.currentPosition;

        break;
      }
      case "ATTACK_ENEMY_ACTOR": {
        const actor = draft[action.data.actor.id];
        const enemyActor = draft[action.data.enemyActor.id];

        enemyActor.healthPoints -= actor.damage;

        if (enemyActor.healthPoints <= 0) {
          enemyActor.isDead = true;
        }

        break;
      }
      case "UPDATE_ACTOR_ATTACK_TARGET": {
        const actor = draft[action.data.actor.id];
        const enemyActor = draft[action.data.enemyActor.id];

        actor.isGoingToAttack = true;
        enemyActor.isGoingToBeAttacked = true;

        break;
      }
      case "FLUSH_ACTORS_ATTACK_TARGET": {
        Object.values(draft).forEach((actor) => {
          actor.isGoingToBeAttacked = false;
          actor.isGoingToAttack = false;
        });

        break;
      }
      case "DISABLE_ACTOR": {
        const actor = draft[action.data.actor.id];

        actor.isDisable = true;

        break;
      }
      case "ENABLE_ALL_ACTORS": {
        Object.values(draft).forEach((actor) => {
          actor.isDisable = false;
        });

        break;
      }
    }
  });
}
