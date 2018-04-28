import { range, remove, times } from "lodash-es";
import { v4 as uuidv4 } from "uuid";

export default class Tilemap {
  private tilemap: TTilemap;

  constructor(params: { width: number; height: number }) {
    const { width, height } = params;
    const tilemap: TTilemap = [];

    times(height, (y) => {
      const tiles: TTile[] = [];

      times(width, (x) => {
        const tile: TTile = {
          id: uuidv4(),
          isActorArea: false,
          isAttackArea: false,
          isAttackRangeArea: false,
          isMoveArea: false,
          isPathfindable: false,
          isSelectedArea: false,
          isWalkableArea: false,
          x,
          y,
        };

        tiles.push(tile);
      });

      tilemap.push(tiles);
    });

    this.tilemap = tilemap;
  }

  public get(): TTilemap {
    return this.tilemap;
  }

  public addPathfindableArea() {
    this.tilemap.forEach((tiles) => {
      tiles.forEach((tile) => {
        tile.isPathfindable =
          tile.isMoveArea && !tile.isActorArea ? true : false;
      });
    });
  }

  public addMoveArea(tile: TTile, radius: number) {
    this.setDiamondArea(tile, radius, { isMoveArea: true });
  }

  public addAttackArea(tile: TTile, radius: number) {
    this.setDiamondArea(tile, radius, { isAttackArea: true });
  }

  public addAttackRangeArea(tile: TTile, radius: number) {
    this.setDiamondArea(tile, radius, { isAttackRangeArea: true });
  }

  public addActorArea(tiles: TTile[]) {
    tiles.forEach((tile) => {
      const { x, y } = tile;

      this.tilemap[y][x].isActorArea = true;
    });
  }

  public addSelectedArea(tile: TTile) {
    const { x, y } = tile;

    this.tilemap[y][x].isSelectedArea = true;
  }

  public removeAllAreas() {
    this.tilemap.forEach((tiles, y) => {
      tiles.forEach((tile, x) => {
        this.tilemap[y][x] = {
          ...tile,
          isActorArea: false,
          isAttackArea: false,
          isAttackRangeArea: false,
          isMoveArea: false,
          isPathfindable: false,
          isSelectedArea: false,
        };
      });
    });
  }

  public removeAllSelectedAreas() {
    this.tilemap.forEach((tiles, y) => {
      tiles.forEach((tile, x) => {
        this.tilemap[y][x].isSelectedArea = false;
      });
    });
  }

  public removeAllAttackRangeAreas() {
    this.tilemap.forEach((tiles, y) => {
      tiles.forEach((tile, x) => {
        this.tilemap[y][x].isAttackRangeArea = false;
      });
    });
  }

  private setDiamondArea(tile: TTile, radius: number, params: any) {
    const diameter = radius * 2;

    times(diameter, (xx) => {
      times(diameter, (yy) => {
        const distance = Math.abs(xx - radius) + Math.abs(yy - radius) < radius;

        if (distance) {
          const x = xx + tile.x - radius;
          const y = yy + tile.y - radius;

          if (this.tilemap[y] && this.tilemap[y][x]) {
            this.tilemap[y][x] = { ...this.tilemap[y][x], ...params };
          }
        }
      });
    });
  }
}
