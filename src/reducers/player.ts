const initialState: TPlayer = {
  selectedActorId: null,
  viewActorId: null,
};

export function player(state = initialState, action: any) {
  switch (action.type) {
    case 'UPDATE_PLAYER_SELECTED_ACTOR_ID': {
      const selectedActorId = action.id;

      return { ...state, selectedActorId };
    }
    case 'UPDATE_PLAYER_VIEW_ACTOR_ID': {
      const viewActorId = action.id;

      return { ...state, viewActorId };
    }
    default: {
      return state;
    }
  }
}
