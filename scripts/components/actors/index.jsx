import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Actor from '../actor';
import { updatePlayerSelectedActorId, squareCell, disableAllCells } from '../../actions';

const Actors = ({
  actors, player, grid, dispatch,
}) => (
  <React.Fragment>
    {Object.values(actors).map((actor) => {
      const { id, x, y } = actor;
      const cell = grid[y][x];
      const { selectedActorId } = player;

      return (
        <Actor
          key={id}
          actor={actor}
          onClick={() => {
            dispatch(disableAllCells());

            if (selectedActorId === id) {
              dispatch(updatePlayerSelectedActorId({ id: null }));
            } else {
              dispatch(updatePlayerSelectedActorId({ id }));
              dispatch(squareCell({ cell }));
            }
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
