import uuidv4 from 'uuid/v4';
import { times, random } from 'lodash';
import clone from 'clone';

const initialState = {};

times(3, () => {
  const id = uuidv4();

  const actor = {
    id,
    x: random(0, 14),
    y: random(0, 14),
  };

  initialState[id] = actor;
});

function actors(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_ACTOR_POSITION': {
      const stateClone = clone(state);
      const { id, x, y } = action.data;

      stateClone[id] = { ...stateClone[id], x, y };

      return stateClone;
    }
    default: {
      return state;
    }
  }
}

export default actors;
