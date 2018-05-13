import delay from "delay";
import { reverse } from "lodash-es";
import Pathfinding from "pathfinding";
import {
  attackEnemyActor,
  disableActor,
  hideActorArea,
  showActorArea,
  updateActorCurrentPosition,
  updateActorOriginalPosition,
  updatePlayerActiveActorId,
  updatePlayerSelectedActorId,
} from "../actions/index";
import getActorTile from "../library/getActorTile";

const finder = new Pathfinding.AStarFinder();

function getDistance(enemyActor: TActor, playerActor: TActor): number {
  const enemyPosition = enemyActor.originalPosition;
  const playerPosition = playerActor.originalPosition;
  let distance = 0;
  distance += Math.abs(enemyPosition.x - playerPosition.x);
  distance += Math.abs(enemyPosition.y - playerPosition.y);

  return distance;
}

function getPlayerActor(getState: TGetState, enemyActor: TActor): TActor {
  const { actors } = getState();
  const distances = Object.values(actors)
    .filter((actor) => !actor.isEnemy && !actor.isDead)
    .map((actor) => ({
      distance: getDistance(enemyActor, actor),
      id: actor.id,
    }))
    .sort((a, b) => a.distance - b.distance);

  return actors[distances[0].id];
}

function getEnemyActor(getState: TGetState): TActor {
  const { actors } = getState();

  return Object.values(actors).find(
    (actor) => actor.isEnemy && !actor.isDisable,
  );
}

function canAttackPlayerActor(getState: TGetState): boolean {
  const { actors, tilemap } = getState();

  return Object.values(actors)
    .filter((actor) => !actor.isEnemy && !actor.isDead)
    .some((actor) => getActorTile(actor, tilemap).isAttackRangeArea);
}

function getPlayerActorToAttack(getState: TGetState): TActor {
  const { actors, tilemap } = getState();

  return Object.values(actors)
    .filter((actor) => !actor.isEnemy && !actor.isDead)
    .find((actor) => getActorTile(actor, tilemap).isAttackRangeArea);
}

function attackPlayerActor(
  dispatch: TDispatch,
  enemyActor: TActor,
  playerActorToAttack: TActor,
) {
  dispatch(attackEnemyActor(enemyActor, playerActorToAttack));
  resetActor(dispatch, enemyActor);
}

function getTilesPathToPlayerActor(
  getState: TGetState,
  enemyActor: TActor,
  playerActor: TActor,
): TTile[] {
  const { tilemap } = getState();
  const playerTile = getActorTile(playerActor, tilemap);
  const matrix = tilemap.map((tiles) =>
    tiles.map((tile) => (!tile.isActorArea || tile === playerTile ? 0 : 1)),
  );
  const grid = new Pathfinding.Grid(matrix);
  const path = finder.findPath(
    enemyActor.originalPosition.x,
    enemyActor.originalPosition.y,
    playerActor.originalPosition.x,
    playerActor.originalPosition.y,
    grid,
  );
  const tiles = path.map((a) => tilemap[a[1]][a[0]]);

  return tiles.slice(0, tiles.length - 1);
}

function getTilePath(tiles: TTile[]): TTile {
  return reverse(tiles).find((tile) => tile.isMoveArea);
}

function moveToPlayerActor(
  dispatch: TDispatch,
  getState: TGetState,
  enemyActor: TActor,
  playerActor: TActor,
) {
  const tilesPathToPlayerActor = getTilesPathToPlayerActor(
    getState,
    enemyActor,
    playerActor,
  );
  const tile = getTilePath(tilesPathToPlayerActor);

  dispatch(updateActorCurrentPosition(enemyActor, tile));
  dispatch(updateActorOriginalPosition(enemyActor));
  resetActor(dispatch, enemyActor);
}

function selectActor(
  dispatch: TDispatch,
  getState: TGetState,
  enemyActor: TActor,
) {
  const { actors } = getState();

  dispatch(updatePlayerActiveActorId(enemyActor));
  dispatch(updatePlayerSelectedActorId(enemyActor));
  dispatch(showActorArea(enemyActor, actors));
}

function resetActor(dispatch: TDispatch, enemyActor: TActor) {
  dispatch(disableActor(enemyActor));
  dispatch(hideActorArea());
  dispatch(updatePlayerActiveActorId());
  dispatch(updatePlayerSelectedActorId());
}

async function enemyTurn(dispatch: TDispatch, getState: TGetState) {
  await delay(500);

  const enemyActor = getEnemyActor(getState);

  selectActor(dispatch, getState, enemyActor);

  if (canAttackPlayerActor(getState)) {
    const playerActorToAttack = getPlayerActorToAttack(getState);

    attackPlayerActor(dispatch, enemyActor, playerActorToAttack);

    await delay(1000);

    return;
  }

  const playerActor = getPlayerActor(getState, enemyActor);

  moveToPlayerActor(dispatch, getState, enemyActor, playerActor);

  await delay(1000);

  return;
}

function areAllEnemyActorsDisabled(getState: TGetState) {
  const { actors } = getState();

  return Object.values(actors)
    .filter((actor) => actor.isEnemy)
    .every((actor) => actor.isDisable);
}

export default async function enemiesTurn(
  dispatch: TDispatch,
  getState: TGetState,
) {
  for (;;) {
    if (areAllEnemyActorsDisabled(getState)) {
      break;
    }

    await enemyTurn(dispatch, getState);
  }
}
