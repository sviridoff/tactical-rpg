export function showActorArea({ cell, cells }: { cell: any; cells: any }) {
  return {
    type: 'SHOW_ACTOR_AREA',
    data: { cell, cells },
  };
}

export function hideActorArea() {
  return {
    type: 'HIDE_ACTOR_AREA',
  };
}

export function updateActorCurrentPosition({ x, y, id }: { x: number; y: number; id: string }) {
  return {
    type: 'UPDATE_ACTOR_CURRENT_POSITION',
    data: { x, y, id },
  };
}

export function updateActorOriginalPosition({ x, y, id }: { x: number; y: number; id: string }) {
  return {
    type: 'UPDATE_ACTOR_ORIGINAL_POSITION',
    data: { x, y, id },
  };
}

export function updatePlayerSelectedActorId({ id }: { id: string }) {
  return {
    type: 'UPDATE_PLAYER_SELECTED_ACTOR_ID',
    id,
  };
}

export function updatePlayerViewActorId({ id }: { id: string }) {
  return {
    type: 'UPDATE_PLAYER_VIEW_ACTOR_ID',
    id,
  };
}
