import delay from "delay";
import Pathfinding from "pathfinding";
import {
  attackEnemyActor,
  disableActor,
  disablePlayerTurn,
  flushActorsAttackTarget,
  hideActorArea,
  hideMatchEndBanner,
  playerLose,
  playerWin,
  restartGame,
  showActorArea,
  showMatchEndBanner,
  showSelectedArea,
  updateActorAttackTarget,
  updateActorCurrentPosition,
  updateActorOriginalPosition,
  updatePlayerActiveActorId,
  updatePlayerSelectedActorId,
} from "../actions/index";
import getActorTile from "../library/getActorTile";
import { areAllEnemyActorsDead, areAllPlayerActorsDead } from "./match";

let next: () => void;

export default async function playerTurn() {
  return new Promise((resolve) => {
    next = resolve;
  });
}

const finder = new Pathfinding.AStarFinder();

function findPathToActor(tilemap: TTilemap, actor: TActor, enemyActor: TActor) {
  const actorOriginalPosition = actor.originalPosition;
  const enemyActorOriginalPosition = enemyActor.originalPosition;
  const actorTile = getActorTile(enemyActor, tilemap);
  const matrix = tilemap.map((tiles) => {
    return tiles.map((tile) => {
      return tile.isPathfindable || (actorTile === tile && tile.isAttackArea)
        ? 0
        : 1;
    });
  });
  const grid = new Pathfinding.Grid(matrix);

  return finder.findPath(
    actorOriginalPosition.x,
    actorOriginalPosition.y,
    enemyActorOriginalPosition.x,
    enemyActorOriginalPosition.y,
    grid,
  );
}

function shouldAttackEnemyActor(
  actor: TActor,
  activeActor: TActor,
  selectedActor: TActor,
  tilemap: TTilemap,
) {
  const actorTile = getActorTile(actor, tilemap);

  return Boolean(
    actor.id === selectedActor.id &&
      activeActor.id !== selectedActor.id &&
      actor.isEnemy &&
      actorTile.isAttackArea,
  );
}

function shouldSelectActor(
  actor: TActor,
  activeActor: TActor,
  selectedActor: TActor,
) {
  return Boolean(actor.id !== activeActor.id && actor.id !== selectedActor.id);
}

function resetActor(dispatch: TDispatch) {
  dispatch(flushActorsAttackTarget());
  dispatch(hideActorArea());
  dispatch(updatePlayerActiveActorId());
  dispatch(updatePlayerSelectedActorId());
}

function attackEnemy(
  dispatch: TDispatch,
  getState: TGetState,
  activeActor: TActor,
  actor: TActor,
) {
  dispatch(updateActorOriginalPosition(activeActor));
  dispatch(attackEnemyActor(activeActor, actor));
  checkDisableActors(dispatch, getState, activeActor);
}

function selectActor(dispatch: TDispatch, actor: TActor, actors: TActors) {
  dispatch(updatePlayerActiveActorId(actor));
  dispatch(updatePlayerSelectedActorId(actor));
  dispatch(showActorArea(actor, actors));
}

function shouldMoveToActor(actor: TActor, tilemap: TTilemap) {
  const actorTile = getActorTile(actor, tilemap);

  return Boolean(actor.isEnemy && actorTile.isAttackArea);
}

function shouldEndMoveActor(actor: TActor, activeActor: TActor) {
  return Boolean(actor.id === activeActor.id);
}

function checkDisableActors(
  dispatch: TDispatch,
  getState: TGetState,
  actor: TActor,
) {
  dispatch(disableActor(actor));

  if (areAllEnemyActorsDead(getState)) {
    dispatch(playerWin());
  }

  if (areAllPlayerActorsDead(getState)) {
    dispatch(playerLose());
  }

  next();
}

function moveToActor(
  dispatch: TDispatch,
  actor: TActor,
  activeActor: TActor,
  tilemap: TTilemap,
) {
  dispatch(updatePlayerSelectedActorId(actor));
  dispatch(flushActorsAttackTarget());

  const actoTile = getActorTile(actor, tilemap);
  if (actoTile.isAttackRangeArea) {
    dispatch(updateActorAttackTarget(activeActor, actor));

    return;
  }

  const path = findPathToActor(tilemap, activeActor, actor);

  if (path.length >= 2) {
    const lastPath = path[path.length - 2];
    const tile = tilemap[lastPath[1]][lastPath[0]];
    dispatch(updateActorCurrentPosition(activeActor, tile));
    dispatch(updateActorAttackTarget(activeActor, actor));
    dispatch(showSelectedArea(tile));
  }
}

export function playerTurnHandler(actor: TActor) {
  return (dispatch: TDispatch, getState: TGetState): void => {
    const { player, actors, tilemap } = getState();
    const { activeActorId, selectedActorId } = player;
    const selectedActor = actors[selectedActorId];
    const activeActor = actors[activeActorId];

    if (!player.isPlayerTurn) {
      return;
    }

    if (!player.isPlayerTurn) {
      return;
    }

    if (!activeActorId) {
      selectActor(dispatch, actor, actors);

      return;
    }

    // The Actor is not active Actor, and active Actor is going to attack.
    // Do nothing.
    if (
      activeActor.id !== actor.id &&
      activeActor.isGoingToAttack &&
      !actor.isGoingToBeAttacked
    ) {
      return;
    }

    // The Actor is active Actor and is one that going to attack.
    // We flush the attack target.
    if (activeActor.id === actor.id && activeActor.isGoingToAttack) {
      dispatch(flushActorsAttackTarget());

      return;
    }

    if (activeActor.isDisable || activeActor.isEnemy) {
      resetActor(dispatch);
      dispatch(playerTurnHandler(actor));

      return;
    }

    if (shouldAttackEnemyActor(actor, activeActor, selectedActor, tilemap)) {
      attackEnemy(dispatch, getState, activeActor, actor);
      resetActor(dispatch);

      return;
    }

    if (shouldMoveToActor(actor, tilemap)) {
      moveToActor(dispatch, actor, activeActor, tilemap);

      return;
    }

    if (shouldSelectActor(actor, activeActor, selectedActor)) {
      dispatch(updatePlayerSelectedActorId(actor));
      dispatch(flushActorsAttackTarget());

      return;
    }

    if (shouldEndMoveActor(actor, activeActor)) {
      dispatch(updateActorOriginalPosition(actor));
      checkDisableActors(dispatch, getState, actor);
      resetActor(dispatch);

      return;
    }
  };
}
