import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Cell from '../cell';
import {
  updateActorCurrentPosition,
  updatePlayerSelectedActorId,
  updatePlayerViewActorId,
  hideActorArea,
} from '../../actions';

const Grid = ({
  grid, player, actors, dispatch,
}) => {
  const { selectedActorId, viewActorId } = player;

  return (
    <React.Fragment>
      {grid.map(row =>
        row.map((cell, index) => {
          const { id, isMoveArea } = cell;

          return (
            <Cell
              key={id}
              onClick={() => {
                // Actor is not selected.
                if (!selectedActorId) {
                  return;
                }

                const actor = actors[selectedActorId];

                // If NOT is move area, set current position to the original.
                if (!isMoveArea) {
                  const { x, y } = actor.original;

                  dispatch(updatePlayerSelectedActorId({ id: null }));
                  dispatch(updatePlayerViewActorId({ id: null }));
                  dispatch(hideActorArea());
                  dispatch(updateActorCurrentPosition({
                      id: selectedActorId,
                      x,
                      y,
                    }));

                  return;
                }

                const { x, y } = cell;

                // If selected actor is NOT viewed, view it,
                if (selectedActorId !== viewActorId) {
                  dispatch(updatePlayerViewActorId({ id: selectedActorId }));
                }

                // Update current position.
                dispatch(updateActorCurrentPosition({
                    id: selectedActorId,
                    x,
                    y,
                  }));
              }}
              cell={cell}
              isFirst={index === 0}
            />
          );
        }))}
    </React.Fragment>
  );
};

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.array).isRequired,
  player: PropTypes.object.isRequired,
  actors: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const ConnectedGrid = connect(store => store)(Grid);

export default ConnectedGrid;
