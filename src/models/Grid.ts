import { times, remove, range } from 'lodash';
import { v4 as uuidv4 } from 'uuid';

type TTileGrid = TTile[][];
type TTileRow = TTile[];

type TCell = {
  x: number;
  y: number;
};
type TGrid = TCell[][];
type TRow = TCell[];

export default class Grid {
  grid: TTileGrid

  constructor({ width, height }: { width: number; height: number }) {
    const grid: TTileGrid = [];

    times(height, y => {
      const row: TTileRow = [];

      times(width, x => {
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

    this.grid = grid;
  }

  get(): TTileGrid {
    return this.grid;
  }

  static addMoveArea({
    grid,
    x,
    y,
    radius,
  }: {
    grid: TTileGrid;
    x: number;
    y: number;
    radius: number;
  }) {
    const cells = Grid.getDiamondCells({ x, y, radius });
    return Grid.applyArea({ grid, cells }, { isMoveArea: true });
  }

  static addAttackArea({
    grid,
    x,
    y,
    radius,
  }: {
    grid: TTileGrid;
    x: number;
    y: number;
    radius: number;
  }) {
    const cells = Grid.getDiamondCells({ x, y, radius });
    return Grid.applyArea({ grid, cells }, { isAttackArea: true });
  }

  static addActorArea({
    grid,
    cells,
    x,
    y,
  }: {
    grid: TTileGrid;
    x: number;
    y: number;
    cells: TTileRow;
  }) {
    remove(cells, cell => cell.x === x && cell.y === y);

    return Grid.applyArea({ grid, cells }, { isActorArea: true });
  }

  static addSelectedArea({ grid, x, y }: { grid: TTileGrid; x: number; y: number }) {
    return Grid.applyArea({ grid, cells: [{ x, y }] }, { isSelectedArea: true });
  }

  static removeAllAreas({ grid }: { grid: TTileGrid }) {
    return grid.map(row =>
      row.map(cell => ({
        ...cell,
        isMoveArea: false,
        isAttackArea: false,
        isActorArea: false,
        isSelectedArea: false,
      })),
    );
  }

  static getSquareCells({ x, y, size }: { x: number; y: number; size: number }) {
    const cells: TRow = [];
    const width = size * 2 + 1;
    const height = size * 2 + 1;

    times(height, yy => {
      times(width, xx => {
        const cell = {
          x: xx - size + x,
          y: yy - size + y,
        };

        cells.push(cell);
      });
    });

    return cells;
  }

  static getDiamondCells({ x, y, radius }: { x: number; y: number; radius: number }) {
    const cells: TRow = [];
    const diameter = radius * 2 + 1;

    times(diameter, xx => {
      times(diameter, yy => {
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

  static applyArea(
    {
      grid,
      cells,
    }: {
      grid: TTileGrid;
      cells: TRow;
    },
    params: any,
  ) {
    const gridClone = grid.slice();

    cells.forEach(cell => {
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
