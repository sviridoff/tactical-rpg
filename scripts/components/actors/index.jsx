import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Actor from '../actor';
import {
  updatePlayerSelectedActorId,
  updatePlayerViewActorId,
  showActorArea,
  hideActorArea,
  updateActorOriginalPosition,
} from '../../actions';

const Actors = ({
  actors, player, grid, dispatch,
}) => (
  <React.Fragment>
    {Object.values(actors).map((actor) => {
      const { id } = actor;
      const { x, y } = actor.current;
      const cell = grid[y][x];
      const { selectedActorId, viewActorId } = player;

      return (
        <Actor
          key={id}
          actor={actor}
          isSelectedArea={selectedActorId === id}
          onClick={() => {
            // Is actor NOT selected.
            if (!selectedActorId) {
              const cells = Object.values(actors).map(({ original }) => ({
                x: original.x,
                y: original.y,
              }));

              dispatch(updatePlayerSelectedActorId({ id }));
              dispatch(updatePlayerViewActorId({ id }));
              dispatch(showActorArea({ cell, cells }));

              return;
            }

            // Is another actor selected or viewed.
            if (selectedActorId !== id || viewActorId !== id) {
              dispatch(updatePlayerViewActorId({ id }));

              return;
            }

            // Is selected, we update the original position.
            dispatch(hideActorArea());
            dispatch(updateActorOriginalPosition({ id, x, y }));
            dispatch(updatePlayerSelectedActorId({ id: null }));
            dispatch(updatePlayerViewActorId({ id: null }));
          }}
        />
      );
    })}
  </React.Fragment>
);

Actors.propTypes = {
  actors: PropTypes.object.isRequired,
  player: PropTypes.object.isRequired,
  grid: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(({ actors, player, grid }) => ({ actors, player, grid }))(Actors);
