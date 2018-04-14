import Grid from "../models/Grid";

const grid1 = new Grid({
  height: 15,
  width: 15,
});

const initialState: TTilemap = grid1.get();

function getActorsTiles(actors: TActors, tilemap: TTilemap) {
  return Object.keys(actors).map((key) => {
    const actor = actors[key];
    const { originalPosition: { x, y } } = actor;

    return tilemap[y][x];
  });
}

export function grid(state = initialState, action: any) {
  switch (action.type) {
    case "SHOW_ACTOR_AREA": {
      const { data, type } = action;
      const { actors, actor } = data;
      const { x, y } = actor.originalPosition;
      const cells = getActorsTiles(actors, state);
      const cell = state[y][x];

      let newState = Grid.addMoveArea({
        grid: state,
        radius: 3,
        x,
        y,
      });

      newState = Grid.addAttackArea({
        grid: newState,
        radius: 4,
        x,
        y,
      });

      newState = Grid.addActorArea({
        cells,
        grid: newState,
        x,
        y,
      });

      newState = Grid.addSelectedArea({
        grid: newState,
        x,
        y,
      });

      return newState;
    }
    case "HIDE_ACTOR_AREA": {
      return Grid.removeAllAreas({ grid: state });
    }
    default: {
      return state;
    }
  }
}
