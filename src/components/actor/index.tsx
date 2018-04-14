import * as React from "react";

const styles = require("./index.css");

interface IActorProps {
  actor: TActor;
  isSelectedArea: boolean;
  updateActor: (param: { actor: TActor }) => void;
}

function getPosition(x: number, y: number) {
  return {
    left: x * 60,
    top: y * 60,
  };
}

export const Actor = (props: IActorProps) => {
  const { actor, isSelectedArea, updateActor } = props;
  const { id, currentPosition: { x, y } } = actor;
  const position = getPosition(x, y);
  const onClick = () => updateActor({ actor });

  return (
    <React.Fragment>
      <div
        data-id={id}
        className={styles.main}
        style={position}
        onClick={onClick}
      />
      {isSelectedArea && (
        <div className={styles.selectedArea} style={position} />
      )}
    </React.Fragment>
  );
};
