import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Actor from '../actor';
import {
  updatePlayerSelectedActorId,
  updatePlayerViewActorId,
  showActorArea,
  disableAllCells,
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
          onClick={() => {
            if (!selectedActorId) {
              dispatch(updatePlayerSelectedActorId({ id }));
              dispatch(updatePlayerViewActorId({ id }));
              dispatch(showActorArea({ cell }));

              return;
            }

            if (selectedActorId !== id || viewActorId !== id) {
              dispatch(updatePlayerViewActorId({ id }));

              return;
            }

            dispatch(disableAllCells());
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
