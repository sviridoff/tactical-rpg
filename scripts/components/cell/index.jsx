import React from 'react';
import PropTypes from 'prop-types';

import style from './index.css';

const Cell = ({ cell, onClick, isFirst }) => {
  const { isMoveArea } = cell;
  const firstClass = isFirst ? style.first : '';
  const enabledClass = isMoveArea ? style.enabled : '';

  return (
    <div
      onClick={onClick}
      className={[style.main, firstClass, enabledClass].join(' ')}
    />
  );
};

Cell.propTypes = {
  cell: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  isFirst: PropTypes.bool.isRequired,
};

export default Cell;
