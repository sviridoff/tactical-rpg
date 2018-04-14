import * as React from "react";

import Tile from "../containers/Tile";

interface IilemapProps {
  grid: TTilemap;
}

export const Tilemap = (props: IilemapProps) => {
  const { grid } = props;

  return (
    <React.Fragment>
      {grid.map((row) => {
        return row.map((tile, index) => {
          const { id } = tile;

          return <Tile key={id} tile={tile} isFirst={index === 0} />;
        });
      })}
    </React.Fragment>
  );
};
