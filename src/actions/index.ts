import * as Pathfinding from "pathfinding";

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

export function updateActorAttackTarget(actor: TActor) {
  return {
    data: { actor },
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

function findPathToActor(tilemap: TTilemap, actor: TActor, enemyActor: TActor) {
  const actorOriginalPosition = actor.originalPosition;
  const enemyActorOriginalPosition = enemyActor.originalPosition;
  const matrix = tilemap.map((tiles) => {
    return tiles.map((tile) => (tile.isAttackArea ? 0 : 1));
  });
  const grid = new Pathfinding.Grid(matrix);
  const finder = new Pathfinding.AStarFinder();

  return finder.findPath(
    actorOriginalPosition.x,
    actorOriginalPosition.y,
    enemyActorOriginalPosition.x,
    enemyActorOriginalPosition.y,
    grid,
  );
}

export function updateActor(actor: TActor) {
  return (dispatch: (parmas: any) => void, getState: () => TState): void => {
    const { player, actors, tilemap } = getState();
    const { activeActorId, selectedActorId } = player;
    const selectedActor = actors[selectedActorId];
    const activeActor = actors[activeActorId];

    // There are NO selected `Actor`.
    if (!activeActorId) {
      dispatch(updatePlayerActiveActorId(actor));
      dispatch(updatePlayerSelectedActorId(actor));

      dispatch(showActorArea(actor, actors));

      return;
    }

    // If the active `Actor` is disabled,
    // we reset and try again update actor with the current `Actor`.
    if (activeActor.isDisable) {
      // Reset.
      dispatch(hideActorArea());
      dispatch(updatePlayerActiveActorId());
      dispatch(updatePlayerSelectedActorId());

      dispatch(updateActor(actor));

      return;
    }

    dispatch(flushActorsAttackTarget());

    // `Actor` should attack, because the enemy `Actor` clicked twice.
    // And NOT is himself.
    if (actor.id === selectedActorId && activeActorId !== selectedActorId) {
      // Attack.
      dispatch(updateActorOriginalPosition(activeActor));
      dispatch(attackEnemyActor(activeActor, selectedActor));

      // Reset.
      dispatch(hideActorArea());
      dispatch(updatePlayerActiveActorId());
      dispatch(updatePlayerSelectedActorId());

      return;
    }

    // When is selected another `Actor`.
    if (actor.id !== selectedActorId) {
      dispatch(updatePlayerSelectedActorId(actor));

      const path = findPathToActor(tilemap, activeActor, actor);

      if (path.length >= 2) {
        const lastPath = path[path.length - 2];
        const tile = tilemap[lastPath[1]][lastPath[0]];
        dispatch(updateActorCurrentPosition(activeActor, tile));
        dispatch(updateActorAttackTarget(actor));
      } else {
        // const tile = tilemap[activeActor.originalPosition.y][activeActor.originalPosition.x];
        // dispatch(updateActorCurrentPosition(activeActor, tile));
      }

      return;
    }

    // Actor should move because was selected twice.
    dispatch(updateActorOriginalPosition(actor));
    dispatch(disableActor(actor));

    // Reset.
    dispatch(hideActorArea());
    dispatch(updatePlayerActiveActorId());
    dispatch(updatePlayerSelectedActorId());
  };
}

function getActorTile(actor: TActor, tilemap: TTilemap) {
  const {
    originalPosition: { x, y },
  } = actor;

  return tilemap[y][x];
}

export function updateTile(tile: TTile) {
  return (dispatch: (parmas: any) => void, getState: () => TState): void => {
    const { player, actors, tilemap } = getState();
    const { activeActorId, selectedActorId } = player;

    // There are NO active `Actor`.
    if (!activeActorId) {
      return;
    }

    const actor = actors[activeActorId];
    const actorTile = getActorTile(actor, tilemap);

    // If `Actor` is disabled, we do nothing.
    if (actor.isDisable) {
      return;
    }

    dispatch(flushActorsAttackTarget());

    // If NOT is in move area, set current position to the original position.
    if (!tile.isMoveArea) {
      dispatch(updateActorCurrentPosition(actor, actorTile));

      // Reset.
      dispatch(updatePlayerActiveActorId());
      dispatch(updatePlayerSelectedActorId());
      dispatch(hideActorArea());

      return;
    }

    // If selected `Actor` is NOT active actor, set active `Actor` as selected one,
    if (activeActorId !== selectedActorId) {
      dispatch(updatePlayerSelectedActorId(actor));
    }

    // If the `Actor` was back to the original position.
    if (actorTile === tile) {
      // Reset.
      dispatch(updatePlayerActiveActorId());
      dispatch(updatePlayerSelectedActorId());
      dispatch(hideActorArea());
    }

    // Update current position.
    dispatch(updateActorCurrentPosition(actor, tile));
  };
}
