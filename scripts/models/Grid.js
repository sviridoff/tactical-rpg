import { times, get } from 'lodash';
import uuidv4 from 'uuid/v4';
import clone from 'clone';

class Grid {
  constructor({ width, height }) {
    const grid = [];

    times(height, (y) => {
      const row = [];

      times(width, (x) => {
        const cell = {
          id: uuidv4(),
          x,
          y,
          isMoveArea: false,
        };

        row.push(cell);
      });

      grid.push(row);
    });

    return grid;
  }

  static getSquare({ x, y, size }) {
    const grid = [];
    const width = size * 2 + 1;
    const height = size * 2 + 1;

    times(height, (yy) => {
      const row = [];

      times(width, (xx) => {
        const cell = {
          id: uuidv4(),
          x: xx - size + x,
          y: yy - size + y,
        };

        row.push(cell);
      });

      grid.push(row);
    });

    return grid;
  }

  static enabling(grid1, grid2) {
    const grid1Clone = clone(grid1, false);

    grid2.forEach((row) => {
      row.forEach(({ x, y }) => {
        const cell = get(grid1Clone, `[${y}][${x}]`);

        if (cell) {
          cell.isMoveArea = true;
        }
      });
    });

    return grid1Clone;
  }

  static disableAll(grid) {
    return grid.map(row =>
      row.map(cell => ({ ...cell, isMoveArea: false })));
  }
}

export default Grid;
