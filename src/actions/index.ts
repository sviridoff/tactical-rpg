export function showActorArea(actor: TActor, actors: TActors) {
  return {
    data: { actor, actors },
    type: "SHOW_ACTIVE_AREA",
  };
}

export function hideActorArea(actors: TActors) {
  return {
    data: { actors },
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

export function showSelectedArea(tile: TTile) {
  return {
    data: { tile },
    type: "SHOW_SELECTED_AREA",
  };
}

export function disablePlayerTurn() {
  return { type: "DISABLE_PLAYER_IS_PLAYER_TURN" };
}

export function enablePlayerTurn() {
  return { type: "ENABLE_PLAYER_IS_PLAYER_TURN" };
}

export function enableAllActors() {
  return { type: "ENABLE_ALL_ACTORS" };
}

export function hidePlayerTurnBanner() {
  return { type: "HIDE_PLAYER_TURN_BANNER" };
}

export function showPlayerTurnBanner() {
  return { type: "SHOW_PLAYER_TURN_BANNER" };
}

export function restartGame() {
  return { type: "RESTART_GAME" };
}

export function playerWin() {
  return { type: "PLAYER_WIN" };
}

export function playerLose() {
  return { type: "PLAYER_LOSE" };
}

export function hideMatchEndBanner() {
  return { type: "HIDE_PLAYER_BATTLE_END_BANNER" };
}

export function showMatchEndBanner() {
  return { type: "SHOW_PLAYER_BATTLE_END_BANNER" };
}
