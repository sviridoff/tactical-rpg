import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Profile = ({ player, actors, grid }) => {
  const { viewActorId, selectedActorId } = player;
  let showMyProfile = false;

  if (viewActorId) {
    const { x, y } = actors[viewActorId].original;
    const isNotSameActor = viewActorId !== selectedActorId;
    const { isAttackArea } = grid[y][x];
    showMyProfile = isAttackArea && isNotSameActor;
  }

  return (
    <div>
      <h1>Viewed profile: {viewActorId}</h1>
      {showMyProfile && <h1>My profile: {selectedActorId}</h1>}
    </div>
  );
};

Profile.propTypes = {
  player: PropTypes.object.isRequired,
  grid: PropTypes.array.isRequired,
  actors: PropTypes.object.isRequired,
};

const ConnectedProfile = connect(store => store)(Profile);

export default ConnectedProfile;
