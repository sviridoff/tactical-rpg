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

export function updateActorCurrentPosition({
  x,
  y,
  id,
}: {
  x: number;
  y: number;
  id: string;
}) {
  return {
    data: { x, y, id },
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

export function updateActor({ actor }: { actor: TActor }) {
  return (dispatch: (parmas: any) => void, getState: () => TState): void => {
    const { player, actors, grid } = getState();
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
