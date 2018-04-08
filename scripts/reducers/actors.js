import uuidv4 from 'uuid/v4';
import { times, random } from 'lodash';
import clone from 'clone';

const initialState = {};

times(3, () => {
  const id = uuidv4();
  const x = random(0, 14);
  const y = random(0, 14);

  const actor = {
    id,
    original: { x, y },
    current: { x, y },
  };

  initialState[id] = actor;
});

function actors(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_ACTOR_CURRENT_POSITION': {
      const stateClone = clone(state);
      const { id, x, y } = action.data;

      stateClone[id] = {
        ...stateClone[id],
        current: { x, y },
      };

      return stateClone;
    }
    case 'UPDATE_ACTOR_ORIGINAL_POSITION': {
      const stateClone = clone(state);
      const { id, x, y } = action.data;

      stateClone[id] = {
        ...stateClone[id],
        original: { x, y },
      };

      return stateClone;
    }
    default: {
      return state;
    }
  }
}

export default actors;
