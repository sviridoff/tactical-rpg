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

export function updatePlayerActiveActorId(actor?: TActor) {
  return {
    data: { actor },
    type: "UPDATE_PLAYER_ACTIVE_ACTOR_ID",
  };
}

export function updatePlayerSelectedActorId(actor?: TActor) {
  return {
    data: { actor },
    type: "UPDATE_PLAYER_SELECTED_ACTOR_ID",
  };
}

export function attackEnemyActor(actor: TActor, enemyActor: TActor) {
  return {
    data: { actor, enemyActor },
    type: "ATTACK_ENEMY_ACTOR",
  };
}

export function updateActor(actor: TActor) {
  return (dispatch: (parmas: any) => void, getState: () => TState): void => {
    const { player, actors, tilemap } = getState();
    const { activeActorId, selectedActorId } = player;
    const selectedActor = actors[selectedActorId];
    const activeActor = actors[activeActorId];

    // There are NO selected actor.
    if (!activeActorId) {
      dispatch(updatePlayerActiveActorId(actor));
      dispatch(updatePlayerSelectedActorId(actor));

      dispatch(showActorArea(actor, actors));

      return;
    }

    // Actor should attack, because the enemy actor clicked twice.
    // And NOT is himself.
    if (actor.id === selectedActorId && activeActorId !== selectedActorId) {
      // Attack.
      dispatch(attackEnemyActor(activeActor, selectedActor));

      // Reset.
      dispatch(hideActorArea());
      dispatch(updatePlayerActiveActorId());
      dispatch(updatePlayerSelectedActorId());

      return;
    }

    // When is selected another Actor.
    if (actor.id !== selectedActorId) {
      dispatch(updatePlayerSelectedActorId(actor));

      return;
    }

    // Actor should move because was selected twice.
    dispatch(updateActorOriginalPosition(actor));

    // Reset.
    dispatch(hideActorArea());
    dispatch(updatePlayerActiveActorId());
    dispatch(updatePlayerSelectedActorId());
  };
}

export function updateTile(tile: TTile) {
  return (dispatch: (parmas: any) => void, getState: () => TState): void => {
    const { player, actors, tilemap } = getState();
    const { activeActorId, selectedActorId } = player;

    // There are NO active actor.
    if (!activeActorId) {
      return;
    }

    const { isMoveArea } = tile;
    const actor = actors[activeActorId];
    const {
      originalPosition: { x, y },
    } = actor;
    const actorTile = tilemap[y][x];

    // If NOT is in move area, set current position to the original position.
    if (!isMoveArea) {
      dispatch(updateActorCurrentPosition(actor, actorTile));

      // Reset.
      dispatch(updatePlayerActiveActorId());
      dispatch(updatePlayerSelectedActorId());
      dispatch(hideActorArea());

      return;
    }

    // If selected actor is NOT active actor, set active actor as selected one,
    if (activeActorId !== selectedActorId) {
      dispatch(updatePlayerSelectedActorId(actor));
    }

    // Update current position.
    dispatch(updateActorCurrentPosition(actor, tile));
  };
}
