import Grid from '../models/Grid';

type TTile = {
  id: string;
  x: number;
  y: number;
  isMoveArea: boolean;
  isAttackArea: boolean;
  isActorArea: boolean;
  isSelectedArea: boolean;
};
type TTileGrid = TTile[][];

const _grid = new Grid({
  width: 15,
  height: 15,
});

const initialState: TTileGrid = _grid.get();

export function grid(state = initialState, action: any) {
  switch (action.type) {
    case 'SHOW_ACTOR_AREA': {
      const { data, type } = action;
      const { cells, cell } = data;
      const { x, y } = cell;

      let newState = Grid.addMoveArea({
        grid: state,
        x,
        y,
        radius: 3,
      });

      newState = Grid.addAttackArea({
        grid: newState,
        x,
        y,
        radius: 4,
      });

      newState = Grid.addActorArea({
        grid: newState,
        cells,
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
    case 'HIDE_ACTOR_AREA': {
      return Grid.removeAllAreas({ grid: state });
    }
    default: {
      return state;
    }
  }
}
