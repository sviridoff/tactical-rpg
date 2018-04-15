import * as React from "react";

const styles = require("./index.css");

interface IProfileProps {
  player: TPlayer;
  actors: TActors;
  tilemap: TTilemap;
}

export const Profile = (props: IProfileProps) => {
  const { player, actors, tilemap } = props;
  const { viewActorId, selectedActorId } = player;

  let viewActorElements: JSX.Element;
  if (viewActorId) {
    const viewActor = actors[viewActorId];
    viewActorElements = (
      <ul className={styles.main}>
        <li>Id: {viewActorId}</li>
        <li>Team name: {viewActor.teamName}</li>
        <li>
          HP: {viewActor.healthPoints}/{viewActor.totalHealthPoints}
        </li>
        <li>Attack: {viewActor.damage}</li>
      </ul>
    );
  }

  let showSelectedActor: boolean = false;
  let selectedActorElements: JSX.Element;
  if (selectedActorId) {
    const selectedActor = actors[selectedActorId];
    selectedActorElements = (
      <ul className={styles.main}>
        <li>Id: {selectedActorId}</li>
        <li>Team name: {selectedActor.teamName}</li>
        <li>
          HP: {selectedActor.healthPoints}/{selectedActor.totalHealthPoints}
        </li>
        <li>Attack: {selectedActor.damage}</li>
      </ul>
    );

    const { originalPosition: { x, y } } = actors[viewActorId];
    const isNotSameActor = viewActorId !== selectedActorId;
    const { isAttackArea } = tilemap[y][x];
    showSelectedActor = isAttackArea && isNotSameActor;
  }

  return (
    <React.Fragment>
      {showSelectedActor && selectedActorElements}
      {viewActorElements}
    </React.Fragment>
  );
};
