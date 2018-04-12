const initialState = {
  selectedActorId: null,
  viewActorId: null,
};

function player(state = initialState, action) {
  switch (action.type) {
    case 'UPDATE_PLAYER_SELECTED_ACTOR_ID': {
      const selectedActorId = action.data.id;

      return { ...state, selectedActorId };
    }
    case 'UPDATE_PLAYER_VIEW_ACTOR_ID': {
      const viewActorId = action.data.id;

      return { ...state, viewActorId };
    }
    default: {
      return state;
    }
  }
}

export default player;
