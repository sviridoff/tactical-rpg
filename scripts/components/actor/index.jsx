import React from 'react';
import PropTypes from 'prop-types';

import style from './index.css';

const Actor = ({ actor, onClick }) => {
  const { x, y } = actor.current;
  const position = {
    top: y * 62,
    left: x * 62,
  };

  return <div className={style.main} style={position} onClick={onClick} />;
};

Actor.propTypes = {
  onClick: PropTypes.func.isRequired,
  actor: PropTypes.object.isRequired,
};

export default Actor;
