import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Profile = ({ player }) => (
  <div>
    <h1>My profile: {player.selectedActorId}</h1>
  </div>
);

Profile.propTypes = {
  player: PropTypes.object.isRequired,
};

const ConnectedProfile = connect(({ player }) => ({ player }))(Profile);

export default ConnectedProfile;
