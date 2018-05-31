import {
  flushActorsAttackTarget,
  hideActorArea,
  showSelectedArea,
  updateActorCurrentPosition,
  updatePlayerActiveActorId,
  updatePlayerSelectedActorId,
} from "../actions/index";
import getActorTile from "../library/getActorTile";

function resetAll(dispatch: TDispatch, getState: TGetState) {
  const { actors } = getState();

  dispatch(updatePlayerActiveActorId());
  dispatch(hideActorArea(actors));
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
      resetAll(dispatch, getState);

      return;
    }

    dispatch(flushActorsAttackTarget());

    // If NOT is in move area, set current position to the original position.
    if (!tile.isMoveArea) {
      dispatch(updateActorCurrentPosition(activeActor, activeActorTile));
      resetAll(dispatch, getState);

      return;
    }

    // If selected `Actor` is NOT active actor, set active `Actor` as selected one,
    if (activeActorId !== selectedActorId) {
      dispatch(updatePlayerSelectedActorId(activeActor));
    }

    // If the `Actor` was back to the original position.
    if (activeActorTile === tile) {
      resetAll(dispatch, getState);
    }

    // Update current position.
    dispatch(updateActorCurrentPosition(activeActor, tile));
    dispatch(showSelectedArea(tile));
  };
}
