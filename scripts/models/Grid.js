import { times } from 'lodash';
import uuidv4 from 'uuid/v4';

class Grid {
  constructor({ width, height }) {
    const grid = [];

    times(width, (x) => {
      const row = [];

      times(height, (y) => {
        const cell = {
          id: uuidv4(),
          x,
          y,
          isEnabled: false,
        };

        row.push(cell);
      });

      grid.push(row);
    });

    return grid;
  }
}

export default Grid;
