import React from 'react';
import PropTypes from 'prop-types';

import style from './index.css';

const Cell = ({ cell, onClick }) => {
  const { y, isEnabled } = cell;
  const firstClass = y === 0 ? style.first : '';
  const enabledClass = isEnabled ? style.enabled : '';

  return (
    <div
      onClick={() => {
        onClick({ isEnabled });
      }}
      className={[style.main, firstClass, enabledClass].join(' ')}
    />
  );
};

Cell.propTypes = {
  cell: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Cell;
