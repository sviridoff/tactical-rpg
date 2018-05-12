import {
  disablePlayerTurn,
  enableAllActors,
  enablePlayerTurn,
  restartGame,
} from "../actions/index";
import enemyTurn from "./enemyTurn";
import matchEndBanner from "./matchEndBanner";
import playerTurn from "./playerTurn";
import turnBanner from "./turnBanner";

export function areAllEnemyActorsDead(getState: TGetState) {
  const { actors } = getState();

  return Object.values(actors)
    .filter((actor) => actor.isEnemy)
    .every((actor) => actor.isDead);
}

export function areAllPlayerActorsDead(getState: TGetState) {
  const { actors } = getState();

  return Object.values(actors)
    .filter((actor) => !actor.isEnemy)
    .every((actor) => actor.isDead);
}

function isEndMatch(getState: TGetState) {
  return areAllEnemyActorsDead(getState) || areAllPlayerActorsDead(getState);
}

function restartMatch(dispatch: TDispatch) {
  dispatch(restartGame());
}

function isPlayerTurn(getState: TGetState) {
  const { player } = getState();

  return player.isPlayerTurn && !isEndMatch(getState);
}

function isEnemyTurn(getState: TGetState) {
  const { player } = getState();

  return !player.isPlayerTurn && !isEndMatch(getState);
}

function endEnemyTurn(dispatch: TDispatch) {
  dispatch(enablePlayerTurn());
  dispatch(enableAllActors());
}

function endPlayerTurn(dispatch: TDispatch) {
  dispatch(disablePlayerTurn());
}

async function match(dispatch: TDispatch, getState: TGetState) {
  if (isPlayerTurn(getState)) {
    await turnBanner(dispatch);
    await playerTurn();
    endPlayerTurn(dispatch);
  }

  if (isEnemyTurn(getState)) {
    await turnBanner(dispatch);
    await enemyTurn();
    endEnemyTurn(dispatch);
  }

  if (isEndMatch(getState)) {
    await matchEndBanner(dispatch);
    restartMatch(dispatch);
  }
}

export async function matchLoop(dispatch: TDispatch, getState: TGetState) {
  for (;;) {
    await match(dispatch, getState);
  }
}
