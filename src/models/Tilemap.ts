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
          isPlayerActorArea: false,
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

  public addPathfindableArea(tilemap: TTilemap) {
    tilemap.forEach((tiles) => {
      tiles.forEach((tile) => {
        tile.isPathfindable =
          tile.isMoveArea && !tile.isActorArea ? true : false;
      });
    });
  }

  public addPlayerActorArea(tilemap: TTilemap, tiles: TTile[]) {
    tiles.forEach((tile) => {
      const { x, y } = tile;

      tilemap[y][x].isPlayerActorArea = true;
    });
  }

  public addMoveArea(tilemap: TTilemap, tile: TTile, radius: number) {
    this.setDiamondArea(tilemap, tile, radius, { isMoveArea: true });
  }

  public addAttackArea(tilemap: TTilemap, tile: TTile, radius: number) {
    this.setDiamondArea(tilemap, tile, radius, { isAttackArea: true });
  }

  public addAttackRangeArea(tilemap: TTilemap, tile: TTile, radius: number) {
    this.setDiamondArea(tilemap, tile, radius, { isAttackRangeArea: true });
  }

  public addActorArea(tilemap: TTilemap, tiles: TTile[]) {
    tiles.forEach((tile) => {
      const { x, y } = tile;

      tilemap[y][x].isActorArea = true;
    });
  }

  public addSelectedArea(tilemap: TTilemap, tile: TTile) {
    const { x, y } = tile;

    tilemap[y][x].isSelectedArea = true;
  }

  public removeAllAreas(tilemap: TTilemap) {
    tilemap.forEach((tiles, y) => {
      tiles.forEach((tile, x) => {
        Object.assign(tile, {
          isActorArea: false,
          isAttackArea: false,
          isAttackRangeArea: false,
          isMoveArea: false,
          isPathfindable: false,
          isPlayerActorArea: false,
          isSelectedArea: false,
        });
      });
    });
  }

  public removeAllSelectedAreas(tilemap: TTilemap) {
    tilemap.forEach((tiles) => {
      tiles.forEach((tile) => {
        tile.isSelectedArea = false;
      });
    });
  }

  public removeAllAttackRangeAreas(tilemap: TTilemap) {
    tilemap.forEach((tiles) => {
      tiles.forEach((tile) => {
        tile.isAttackRangeArea = false;
      });
    });
  }

  private setDiamondArea(
    tilemap: TTilemap,
    tile: TTile,
    radius: number,
    params: any,
  ) {
    const diameter = radius * 2;

    times(diameter, (xx) => {
      times(diameter, (yy) => {
        const distance = Math.abs(xx - radius) + Math.abs(yy - radius) < radius;

        if (distance) {
          const x = xx + tile.x - radius;
          const y = yy + tile.y - radius;

          if (tilemap[y] && tilemap[y][x]) {
            Object.assign(tilemap[y][x], params);
          }
        }
      });
    });
  }
}
