import classNames from "classnames";
import React from "react";

import tileArea from "../../library/tileArea";
const styles = require("./index.css");

export interface ITileProps {
  tile: TTile;
  isFirst: boolean;
  updateTile: (tile: TTile) => any;
}

function Tile(props: ITileProps) {
  const { tile, isFirst, updateTile } = props;
  const { isMoveArea, isAttackArea, isActorArea, isSelectedArea, x, y } = tile;
  const onClick = () => updateTile(tile);
  const className = classNames({
    [styles.first]: isFirst,
    [styles.main]: true,
  });

  let area: JSX.Element;

  if (isSelectedArea) {
    area = <div className={styles.selectedArea} />;
  } else if (isActorArea) {
    area = <div className={styles.actorArea} />;
  } else if (isMoveArea) {
    area = <div className={styles.moveArea} />;
  } else if (isAttackArea) {
    area = <div className={styles.attackArea} />;
  }

  return (
    <div
      onClick={onClick}
      data-id={`${y}_${x}`}
      className={className}
      style={tileArea}
    >
      {area}
    </div>
  );
}

export default Tile;
