import uuidv4 from 'uuid/v4';
import { times } from 'lodash';
import clone from 'clone';

const initialState = {};
const positions = [[2, 2], [3, 3], [6, 6]];

times(3, (index) => {
  const id = uuidv4();
  const [x, y] = positions[index];

  initialState[id] = {
    id,
    original: { x, y },
    current: { x, y },
  };
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
