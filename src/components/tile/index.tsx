import * as React from 'react';

const style = require('./index.css');

interface TileProps {
  tile: TTile;
  onClick: () => void;
  isFirst: boolean;
}

export const Tile = ({ tile, onClick, isFirst }: TileProps) => {
  const { isMoveArea, isAttackArea, isActorArea, x, y } = tile;

  let area;

  if (isActorArea) {
    area = <div className={style.actorArea} />;
  } else if (isMoveArea) {
    area = <div className={style.moveArea} />;
  } else if (isAttackArea) {
    area = <div className={style.attackArea} />;
  }

  return (
    <div
      onClick={onClick}
      data-id={`${x}_${y}`}
      className={[style.main, isFirst && style.first].join(' ')}
    >
      {area}
    </div>
  );
};
