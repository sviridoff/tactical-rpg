import * as React from 'react';

const styles = require('./index.css');

interface ActorProps {
  onClick: () => void;
  actor: TActor;
  isSelectedArea: boolean;
}

export const Actor = (props: ActorProps) => {
  const { actor, onClick, isSelectedArea } = props;
  const { id, currentPosition: { x, y } } = actor;
  const position = {
    top: y * 60,
    left: x * 60,
  };

  return (
    <React.Fragment>
      <div data-id={id} className={styles.main} style={position} onClick={onClick} />
      {isSelectedArea && <div className={styles.selectedArea} style={position} />}
    </React.Fragment>
  );
};
