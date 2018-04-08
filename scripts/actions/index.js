export function enableCell({ cell }) {
  return {
    type: 'ENABLE_CELL',
    data: { cell },
  };
}

export function disableCell({ cell }) {
  return {
    type: 'DISABLE_CELL',
    data: { cell },
  };
}

export function showActorArea({ cell }) {
  return {
    type: 'SHOW_ACTOR_AREA',
    data: { cell },
  };
}

export function disableAllCells() {
  return {
    type: 'DISABLE_ALL_CELLS',
  };
}

export function updateActorCurrentPosition({ x, y, id }) {
  return {
    type: 'UPDATE_ACTOR_CURRENT_POSITION',
    data: { x, y, id },
  };
}

export function updateActorOriginalPosition({ x, y, id }) {
  return {
    type: 'UPDATE_ACTOR_ORIGINAL_POSITION',
    data: { x, y, id },
  };
}

export function updatePlayerSelectedActorId({ id }) {
  return {
    type: 'UPDATE_PLAYER_SELECTED_ACTOR_ID',
    data: { id },
  };
}

export function updatePlayerViewActorId({ id }) {
  return {
    type: 'UPDATE_PLAYER_VIEW_ACTOR_ID',
    data: { id },
  };
}
