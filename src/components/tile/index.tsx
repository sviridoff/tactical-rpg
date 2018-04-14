import * as React from "react";

const styles = require("./index.css");

interface ITileProps {
  tile: TTile;
  onClick: () => void;
  isFirst: boolean;
}

export const Tile = (props: ITileProps) => {
  const { tile, onClick, isFirst } = props;
  const { isMoveArea, isAttackArea, isActorArea, x, y } = tile;

  let area: JSX.Element;

  if (isActorArea) {
    area = <div className={styles.actorArea} />;
  } else if (isMoveArea) {
    area = <div className={styles.moveArea} />;
  } else if (isAttackArea) {
    area = <div className={styles.attackArea} />;
  }

  return (
    <div
      onClick={onClick}
      data-id={`${x}_${y}`}
      className={[styles.main, isFirst && styles.first].join(" ")}
    >
      {area}
    </div>
  );
};
