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

function getPlayerActor(getState: TGetState): TActor {
  const { actors } = getState();

  return Object.values(actors).filter((actor) => !actor.isEnemy)[0];
}

function getEnemyActor(getState: TGetState): TActor {
  const { actors } = getState();

  return Object.values(actors).filter((actor) => actor.isEnemy)[0];
}

function canAttackPlayerActor(getState: TGetState): boolean {
  const { actors, tilemap } = getState();

  return Object.values(actors)
    .filter((actor) => !actor.isEnemy)
    .some((actor) => getActorTile(actor, tilemap).isAttackRangeArea);
}

function getPlayerActorToAttack(getState: TGetState): TActor {
  const { actors, tilemap } = getState();

  return Object.values(actors)
    .filter((actor) => !actor.isEnemy)
    .find((actor) => getActorTile(actor, tilemap).isAttackRangeArea);
}

function attackPlayerActor(
  dispatch: TDispatch,
  enemyActor: TActor,
  playerActorToAttack: TActor,
) {
  dispatch(attackEnemyActor(enemyActor, playerActorToAttack));
  dispatch(disableActor(enemyActor));
  dispatch(hideActorArea());
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

function getTile(tiles: TTile[]): TTile {
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
  const tile = getTile(tilesPathToPlayerActor);

  dispatch(updateActorCurrentPosition(enemyActor, tile));
  dispatch(updateActorOriginalPosition(enemyActor));
  dispatch(disableActor(enemyActor));
  dispatch(hideActorArea());
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

export default async function enemyTurn(
  dispatch: TDispatch,
  getState: TGetState,
) {
  await delay(500);

  const enemyActor = getEnemyActor(getState);

  selectActor(dispatch, getState, enemyActor);

  if (canAttackPlayerActor(getState)) {
    const playerActorToAttack = getPlayerActorToAttack(getState);

    attackPlayerActor(dispatch, enemyActor, playerActorToAttack);

    await delay(1000);

    return;
  }

  const playerActor = getPlayerActor(getState);

  moveToPlayerActor(dispatch, getState, enemyActor, playerActor);

  await delay(1000);

  return;
}
