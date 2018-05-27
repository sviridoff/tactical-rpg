import classNames from "classnames";
import React from "react";

const styles = require("./index.css");
import tileArea from "../../library/tileArea";

interface IActorProps {
  actor: TActor;
  playerTurnHandler: (actor: TActor) => void;
}

function getPosition(actor: TActor, tileArea: any) {
  return {
    left: actor.currentPosition.x * tileArea.width,
    top: actor.currentPosition.y * tileArea.height,
  };
}

function getHpBarWidth(actor: TActor) {
  return {
    width: `${actor.hp * 100 / actor.totalHp}%`,
  };
}

function Actor(props: IActorProps) {
  const { actor, playerTurnHandler } = props;
  const position = getPosition(actor, tileArea);
  const hpBarWidth = getHpBarWidth(actor);
  const onClick = () => playerTurnHandler(actor);
  const className = classNames({
    [styles.main]: true,
    [styles.enemy]: actor.isEnemy,
    [styles.disable]: actor.isDisable,
  });

  if (actor.isDead) {
    return null;
  }

  return (
    <div
      data-id={actor.id}
      className={className}
      style={{ ...position, ...tileArea }}
      onClick={onClick}
    >
      {actor.isGoingToBeAttacked && <div className={styles.attackTarget} />}
      <div className={[styles.image, styles[actor.image]].join(" ")} />
      <div className={styles.hpNumber}>{actor.hp}</div>
      <div className={styles.hpBarWrapper}>
        <div className={styles.hpBar} style={hpBarWidth} />
      </div>
    </div>
  );
}

export default Actor;
