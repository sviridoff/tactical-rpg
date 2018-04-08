import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Cell from '../cell';
import { updateActorPosition } from '../../actions';

const Grid = ({ grid, player, dispatch }) => {
  const { selectedActorId } = player;

  return (
    <React.Fragment>
      {grid.map(row =>
        row.map((cell, index) => {
          const {
            x, y, id, isMoveArea,
          } = cell;

          return (
            <Cell
              key={id}
              onClick={() => {
                if (!selectedActorId) {
                  return;
                }

                if (!isMoveArea) {
                  return;
                }

                dispatch(updateActorPosition({
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
  dispatch: PropTypes.func.isRequired,
};

const ConnectedGrid = connect(({ grid, player }) => ({ grid, player }))(Grid);

export default ConnectedGrid;
