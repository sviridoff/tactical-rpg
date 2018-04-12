import { times, remove, range } from 'lodash';
import uuidv4 from 'uuid/v4';

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
          isAttackArea: false,
          isActorArea: false,
          isSelectedArea: false,
        };

        row.push(cell);
      });

      grid.push(row);
    });

    return grid;
  }

  static addMoveArea({
    grid, x, y, radius,
  }) {
    const cells = Grid.getDiamondCells({ x, y, radius });
    return Grid.applyArea({ grid, cells }, { isMoveArea: true });
  }

  static addAttackArea({
    grid, x, y, radius,
  }) {
    const cells = Grid.getDiamondCells({ x, y, radius });
    return Grid.applyArea({ grid, cells }, { isAttackArea: true });
  }

  static addActorArea({
    grid, cells, x, y,
  }) {
    remove(cells, cell => cell.x === x && cell.y === y);

    return Grid.applyArea({ grid, cells }, { isActorArea: true });
  }

  static addSelectedArea({ grid, x, y }) {
    return Grid.applyArea({ grid, cells: [{ x, y }] }, { isSelectedArea: true });
  }

  static removeAllAreas({ grid }) {
    return grid.map(row =>
      row.map(cell => ({
        ...cell,
        isMoveArea: false,
        isAttackArea: false,
        isActorArea: false,
        isSelectedArea: false,
      })));
  }

  static getSquareCells({ x, y, size }) {
    const cells = [];
    const width = size * 2 + 1;
    const height = size * 2 + 1;

    times(height, (yy) => {
      times(width, (xx) => {
        const cell = {
          x: xx - size + x,
          y: yy - size + y,
        };

        cells.push(cell);
      });
    });

    return cells;
  }

  static getDiamondCells({ x, y, radius }) {
    const cells = [];
    const diameter = radius * 2 + 1;

    times(diameter, (xx) => {
      times(diameter, (yy) => {
        const distance = Math.abs(xx - radius) + Math.abs(yy - radius) < radius;

        if (distance) {
          const cell = {
            x: xx + x - radius,
            y: yy + y - radius,
          };

          cells.push(cell);
        }
      });
    });

    return cells;
  }

  static applyArea({ grid, cells }, params) {
    const gridClone = grid.slice();

    cells.forEach((cell) => {
      if (grid[cell.y] && grid[cell.y][cell.x]) {
        gridClone[cell.y][cell.x] = {
          ...grid[cell.y][cell.x],
          ...params,
        };
      }
    });

    return gridClone;
  }
}

export default Grid;
