import clone from 'clone';

import Grid from '../models/Grid';

const initialState = new Grid({
  width: 15,
  height: 15,
});

function grid(state = initialState, action) {
  if (action.type === 'ENABLE_CELL') {
    const clonedState = clone(state);

    const { x, y } = action.data.cell;
    clonedState[x][y].isEnabled = true;

    return clonedState;
  } else if (action.type === 'DISABLE_CELL') {
    const clonedState = clone(state);

    const { x, y } = action.data.cell;
    clonedState[x][y].isEnabled = false;

    return clonedState;
  }

  return state;
}

export default grid;
