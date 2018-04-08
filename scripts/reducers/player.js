const initialState = {
  selectedActorId: null,
};

function player(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PLAYER_ACTOR_ID': {
      const selectedActorId = action.data.id;

      return { ...state, selectedActorId };
    }
    default: {
      return state;
    }
  }
}

export default player;
