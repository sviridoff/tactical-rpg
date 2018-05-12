import produce from "immer";
import getActorTile from "../library/getActorTile";
import Tilemap from "../models/Tilemap";

const tm = new Tilemap({
  height: 8,
  width: 6,
});

const initialState: TTilemap = tm.get();

function getLiveActorsTiles(actors: TActors, tilemap: TTilemap) {
  return Object.keys(actors)
    .filter((key) => !actors[key].isDead)
    .map((key) => getActorTile(actors[key], tilemap));
}

export function tilemap(state = initialState, action: any) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "SHOW_ACTOR_AREA": {
        const { actor, actors } = action.data;
        const actorTiles = getLiveActorsTiles(actors, state);
        const actorTile = getActorTile(actor, state);

        tm.removeAllAreas(draft);
        tm.addMoveArea(draft, actorTile, 3);
        tm.addAttackArea(draft, actorTile, 4);
        tm.addActorArea(draft, actorTiles);
        tm.addPathfindableArea(draft);
        tm.addAttackRangeArea(draft, actorTile, 2);

        break;
      }
      case "HIDE_ACTOR_AREA": {
        tm.removeAllAreas(draft);

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
