export function showActorArea(actor: TActor, actors: TActors) {
  return {
    data: { actor, actors },
    type: "SHOW_ACTOR_AREA",
  };
}

export function hideActorArea() {
  return {
    type: "HIDE_ACTOR_AREA",
  };
}

export function updateActorCurrentPosition(actor: TActor, tile: TTile) {
  return {
    data: { actor, tile },
    type: "UPDATE_ACTOR_CURRENT_POSITION",
  };
}

export function updateActorOriginalPosition(actor: TActor) {
  return {
    data: { actor },
    type: "UPDATE_ACTOR_ORIGINAL_POSITION",
  };
}

export function updatePlayerSelectedActorId(actor?: TActor) {
  return {
    data: { actor },
    type: "UPDATE_PLAYER_SELECTED_ACTOR_ID",
  };
}

export function updatePlayerViewActorId(actor?: TActor) {
  return {
    data: { actor },
    type: "UPDATE_PLAYER_VIEW_ACTOR_ID",
  };
}

export function updateActor(actor: TActor) {
  return (dispatch: (parmas: any) => void, getState: () => TState): void => {
    const { player, actors, tilemap } = getState();
    const { selectedActorId, viewActorId } = player;
    const { id, currentPosition: { x, y } } = actor;

    // Is actor NOT selected.
    if (!selectedActorId) {
      dispatch(updatePlayerSelectedActorId(actor));
      dispatch(updatePlayerViewActorId(actor));

      dispatch(showActorArea(actor, actors));

      return;
    }

    // Is another actor is selected or viewed.
    if (selectedActorId !== id || viewActorId !== id) {
      dispatch(updatePlayerViewActorId(actor));

      return;
    }

    // Is selected, we update the originalPosition position.
    dispatch(hideActorArea());
    dispatch(updateActorOriginalPosition(actor));
    dispatch(updatePlayerSelectedActorId());
    dispatch(updatePlayerViewActorId());
  };
}

export function updateTile(tile: TTile) {
  return (dispatch: (parmas: any) => void, getState: () => TState): void => {
    const { player, actors, tilemap } = getState();
    const { selectedActorId, viewActorId } = player;

    // Actor is not selected.
    if (!selectedActorId) {
      return;
    }

    const { isMoveArea } = tile;
    const actor = actors[selectedActorId];
    const { originalPosition: { x, y } } = actor;
    const actorTile = tilemap[y][x];

    // If NOT is move area, set current position to the originalPosition.
    if (!isMoveArea) {
      dispatch(updatePlayerSelectedActorId());
      dispatch(updatePlayerViewActorId());
      dispatch(hideActorArea());
      dispatch(updateActorCurrentPosition(actor, actorTile));

      return;
    }

    // If selected actor is NOT viewed, view it,
    if (selectedActorId !== viewActorId) {
      dispatch(updatePlayerViewActorId(actor));
    }

    // Update current position.
    dispatch(updateActorCurrentPosition(actor, tile));
  };
}
