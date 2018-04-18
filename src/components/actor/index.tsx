import * as React from "react";

const styles = require("./index.css");

interface IActorProps {
  actor: TActor;
  isSelectedArea: boolean;
  updateActor: (actor: TActor) => void;
}

function getPosition(actor: TActor) {
  return {
    left: actor.currentPosition.x * 22,
    top: actor.currentPosition.y * 22,
  };
}

function getHealthBarWidth(actor: TActor) {
  return {
    width: actor.healthPoints * 100 / actor.totalHealthPoints + "%",
  };
}

export const Actor = (props: IActorProps) => {
  const { actor, isSelectedArea, updateActor } = props;
  const position = getPosition(actor);
  const healthBarWidth = getHealthBarWidth(actor);
  const onClick = () => updateActor(actor);

  return (
    <React.Fragment>
      <div
        data-id={actor.id}
        className={styles.main}
        style={position}
        onClick={onClick}
      >
        <div className={styles.healthBar} style={healthBarWidth} />
      </div>
      {isSelectedArea && (
        <div className={styles.selectedArea} style={position} />
      )}
    </React.Fragment>
  );
};
