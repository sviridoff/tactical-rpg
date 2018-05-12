import React from "react";

const styles = require("./index.css");

interface IProfileProps {
  activeActor: TActor;
  selectedActor: TActor;
  showActiveActor: boolean;
}

function createActorElement(actor: TActor): JSX.Element {
  return (
    <ul className={styles.main}>
      <li>Id: {actor.id}</li>
      <li>
        HP: {actor.healthPoints}/{actor.totalHealthPoints}
      </li>
      <li>Attack: {actor.damage}</li>
    </ul>
  );
}

export const Profile = (props: IProfileProps) => {
  const { activeActor, selectedActor, showActiveActor } = props;

  return (
    <React.Fragment>
      {showActiveActor && activeActor && createActorElement(activeActor)}
      {selectedActor && createActorElement(selectedActor)}
    </React.Fragment>
  );
};
