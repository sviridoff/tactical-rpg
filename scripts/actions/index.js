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

export function squareCell({ cell }) {
  return {
    type: 'SQUARE_CELL',
    data: { cell },
  };
}

export function disableAllCells() {
  return {
    type: 'DISABLE_ALL_CELLS',
  };
}

export function updateActorPosition({ x, y, id }) {
  return {
    type: 'UPDATE_ACTOR_POSITION',
    data: { x, y, id },
  };
}

export function updatePlayerSelectedActorId({ id }) {
  return {
    type: 'UPDATE_PLAYER_ACTOR_ID',
    data: { id },
  };
}
