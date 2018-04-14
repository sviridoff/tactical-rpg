import Tilemap from "../models/Tilemap";

const tm = new Tilemap({
  height: 15,
  width: 15,
});

const initialState: TTilemap = tm.get();

function getActorsTiles(actors: TActors, tilemap: TTilemap) {
  return Object.keys(actors).map((key) => {
    const actor = actors[key];
    const { originalPosition: { x, y } } = actor;

    return tilemap[y][x];
  });
}

export function tilemap(state = initialState, action: any) {
  switch (action.type) {
    case "SHOW_ACTOR_AREA": {
      const { actor, actors } = action.data;
      const { x, y } = actor.originalPosition;
      const tiles = getActorsTiles(actors, state);
      const tile = state[y][x];

      tm.addMoveArea(tile, 3);
      tm.addAttackArea(tile, 4);
      tm.addActorArea(tiles);

      return tm.get();
    }
    case "HIDE_ACTOR_AREA": {
      tm.removeAllAreas();

      return tm.get();
    }
    default: {
      return state;
    }
  }
}
