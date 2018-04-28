import React from "react";

const styles = require("./index.css");

interface IProfileProps {
  player: TPlayer;
  actors: TActors;
  tilemap: TTilemap;
}

export const Profile = (props: IProfileProps) => {
  const { player, actors, tilemap } = props;
  const { selectedActorId, activeActorId } = player;

  let viewActorElements: JSX.Element;
  if (selectedActorId) {
    const viewActor = actors[selectedActorId];
    viewActorElements = (
      <ul className={styles.main}>
        <li>Id: {selectedActorId}</li>
        <li>
          HP: {viewActor.healthPoints}/{viewActor.totalHealthPoints}
        </li>
        <li>Attack: {viewActor.damage}</li>
      </ul>
    );
  }

  let showSelectedActor: boolean = false;
  let selectedActorElements: JSX.Element;
  if (activeActorId) {
    const selectedActor = actors[activeActorId];
    selectedActorElements = (
      <ul className={styles.main}>
        <li>Id: {activeActorId}</li>
        <li>
          HP: {selectedActor.healthPoints}/{selectedActor.totalHealthPoints}
        </li>
        <li>Attack: {selectedActor.damage}</li>
      </ul>
    );

    const { originalPosition: { x, y }, isEnemy } = actors[selectedActorId];
    const isNotSameActor = selectedActorId !== activeActorId;
    const { isAttackArea } = tilemap[y][x];
    showSelectedActor = isAttackArea && isNotSameActor && isEnemy;
  }

  return (
    <React.Fragment>
      {showSelectedActor && selectedActorElements}
      {viewActorElements}
    </React.Fragment>
  );
};
