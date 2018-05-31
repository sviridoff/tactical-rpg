import {
  disablePlayerTurn,
  enableAllActors,
  enablePlayerTurn,
  restartGame,
} from "../actions/index";
import enemiesTurn from "./enemiesTurn";
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

function isEnemiesTurn(getState: TGetState) {
  const { player } = getState();

  return !player.isPlayerTurn && !isEndMatch(getState);
}

function endEnemiesTurn(dispatch: TDispatch) {
  dispatch(enablePlayerTurn());
  dispatch(enableAllActors());
}

function endPlayerTurn(dispatch: TDispatch) {
  dispatch(disablePlayerTurn());
}

async function match(dispatch: TDispatch, getState: TGetState) {
  if (isPlayerTurn(getState)) {
    await turnBanner(dispatch);
    await playerTurn(dispatch, getState);
    endPlayerTurn(dispatch);
  }

  if (isEnemiesTurn(getState)) {
    await turnBanner(dispatch);
    await enemiesTurn(dispatch, getState);
    endEnemiesTurn(dispatch);
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
