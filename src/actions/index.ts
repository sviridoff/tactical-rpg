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

export function updateActorAttackTarget(actor: TActor, enemyActor: TActor) {
  return {
    data: { actor, enemyActor },
    type: "UPDATE_ACTOR_ATTACK_TARGET",
  };
}

export function flushActorsAttackTarget() {
  return {
    type: "FLUSH_ACTORS_ATTACK_TARGET",
  };
}

export function disableActor(actor: TActor) {
  return {
    data: { actor },
    type: "DISABLE_ACTOR",
  };
}
