import React from 'react';
import PropTypes from 'prop-types';

import style from './index.css';

const Actor = ({ actor, onClick, isSelectedArea }) => {
  const { x, y } = actor.current;
  const position = {
    top: y * 60,
    left: x * 60,
  };

  return (
    <React.Fragment>
      <div className={style.main} style={position} onClick={onClick} />
      {isSelectedArea && <div className={style.selectedArea} style={position} />}
    </React.Fragment>
  );
};

Actor.propTypes = {
  onClick: PropTypes.func.isRequired,
  actor: PropTypes.object.isRequired,
};

export default Actor;
