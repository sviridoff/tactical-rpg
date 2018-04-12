import React from 'react';
import PropTypes from 'prop-types';

import style from './index.css';

const Cell = ({ cell, onClick, isFirst }) => {
  const {
    isMoveArea, isAttackArea, isActorArea, x, y,
  } = cell;

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

Cell.propTypes = {
  cell: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isFirst: PropTypes.bool.isRequired,
};

export default Cell;
