import {
  flushActorsAttackTarget,
  hideActorArea,
  showSelectedArea,
  updateActorCurrentPosition,
  updatePlayerActiveActorId,
  updatePlayerSelectedActorId,
} from "../actions/index";

function getActorTile(actor: TActor, tilemap: TTilemap) {
  const {
    originalPosition: { x, y },
  } = actor;

  return tilemap[y][x];
}

function resetAll(dispatch: TDispatch) {
  dispatch(updatePlayerActiveActorId());
  dispatch(hideActorArea());
}

export function updateTile(tile: TTile) {
  return (dispatch: TDispatch, getState: TGetState): void => {
    const { player, actors, tilemap } = getState();
    const { activeActorId, selectedActorId } = player;

    if (!player.isPlayerTurn) {
      return;
    }

    // There are NO active `Actor`.
    if (!activeActorId) {
      return;
    }

    const activeActor = actors[activeActorId];
    const activeActorTile = getActorTile(activeActor, tilemap);

    // If `Actor` is disabled, we do nothing.
    if (activeActor.isDisable || activeActor.isEnemy) {
      resetAll(dispatch);

      return;
    }

    dispatch(flushActorsAttackTarget());

    // If NOT is in move area, set current position to the original position.
    if (!tile.isMoveArea) {
      dispatch(updateActorCurrentPosition(activeActor, activeActorTile));
      resetAll(dispatch);

      return;
    }

    // If selected `Actor` is NOT active actor, set active `Actor` as selected one,
    if (activeActorId !== selectedActorId) {
      dispatch(updatePlayerSelectedActorId(activeActor));
    }

    // If the `Actor` was back to the original position.
    if (activeActorTile === tile) {
      resetAll(dispatch);
    }

    // Update current position.
    dispatch(updateActorCurrentPosition(activeActor, tile));
    dispatch(showSelectedArea(tile));
  };
}
