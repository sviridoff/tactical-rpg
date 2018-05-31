import produce from "immer";
import getActorTile from "../library/getActorTile";
import Tilemap from "../models/Tilemap";

const tm = new Tilemap({
  height: 8,
  width: 6,
});

const initialState: TTilemap = tm.get();

function getActorTiles(actors: TActors, tilemap: TTilemap) {
  return Object.keys(actors)
    .filter((key) => !actors[key].isDead)
    .map((key) => getActorTile(actors[key], tilemap));
}

function getPlayerActorTiles(actors: TActors, tilemap: TTilemap) {
  return Object.keys(actors)
    .filter((key) => !actors[key].isDead && !actors[key].isEnemy)
    .map((key) => getActorTile(actors[key], tilemap));
}

export function tilemap(state = initialState, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SHOW_ACTIVE_AREA": {
        const { actor, actors } = action.data;
        const actorTiles = getActorTiles(actors, state);
        const actorTile = getActorTile(actor, state);
        const playerActorTile = getPlayerActorTiles(actors, state);

        tm.removeAllAreas(draft);
        tm.addMoveArea(draft, actorTile, 3);
        tm.addAttackArea(draft, actorTile, 4);
        tm.addActorArea(draft, actorTiles);
        tm.addPlayerActorArea(draft, playerActorTile);
        tm.addPathfindableArea(draft);
        tm.addAttackRangeArea(draft, actorTile, 2);

        break;
      }
      case "HIDE_ACTOR_AREA": {
        const { actors } = action.data;
        const playerActorTile = getPlayerActorTiles(actors, state);

        tm.removeAllAreas(draft);
        tm.addPlayerActorArea(draft, playerActorTile);

        break;
      }
      case "SHOW_SELECTED_AREA": {
        const { tile } = action.data;

        tm.removeAllSelectedAreas(draft);
        tm.removeAllAttackRangeAreas(draft);
        tm.addSelectedArea(draft, tile);
        tm.addAttackRangeArea(draft, tile, 2);

        break;
      }
    }
  });
}
