import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Cell from './cell';
import { enableCell, disableCell } from '../actions';

const Grid = ({ grid, dispatch }) => (
  <React.Fragment>
    {grid.map(row =>
      row.map(cell => (
        <Cell
          key={`${cell.x}_${cell.y}`}
          onClick={({ isEnabled }) => {
            if (isEnabled) {
              dispatch(disableCell({ cell }));
            } else {
              dispatch(enableCell({ cell }));
            }
          }}
          cell={cell}
        />
      )))}
  </React.Fragment>
);

Grid.propTypes = {
  grid: PropTypes.arrayOf(PropTypes.array).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const ConnectedGrid = connect(({ grid }) => ({ grid }))(Grid);

export default ConnectedGrid;
