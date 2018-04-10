import Grid from '../models/Grid';

const initialState = new Grid({
  width: 15,
  height: 15,
});

function grid(state = initialState, { data, type }) {
  switch (type) {
    case 'SHOW_ACTOR_AREA': {
      const { cells, cell } = data;
      const { x, y } = cell;

      let newState = Grid.addMoveArea({
        grid: state, x, y, size: 2,
      });

      newState = Grid.addAttackArea({
        grid: newState, x, y, size: 3,
      });

      newState = Grid.addActorArea({
        grid: newState, cells, x, y,
      });

      newState = Grid.addSelectedArea({
        grid: newState, x, y,
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

export default grid;
