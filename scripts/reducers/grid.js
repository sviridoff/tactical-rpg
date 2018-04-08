import clone from 'clone';

import Grid from '../models/Grid';

const initialState = new Grid({
  width: 15,
  height: 15,
});

function grid(state = initialState, { data, type }) {
  switch (type) {
    case 'ENABLE_CELL': {
      const clonedState = clone(state, false);
      const { x, y } = data.cell;

      clonedState[x][y].isMoveArea = true;

      return clonedState;
    }
    case 'DISABLE_CELL': {
      const clonedState = clone(state, false);
      const { x, y } = data.cell;

      clonedState[x][y].isMoveArea = false;

      return clonedState;
    }
    case 'SHOW_ACTOR_AREA': {
      const clonedState = clone(state, false);
      const { x, y } = data.cell;

      const squareGrid = Grid.getSquare({ x, y, size: 2 });

      return Grid.enabling(clonedState, squareGrid);
    }
    case 'DISABLE_ALL_CELLS': {
      const clonedState = clone(state, false);

      return Grid.disableAll(clonedState);
    }
    default: {
      return state;
    }
  }
}

export default grid;
