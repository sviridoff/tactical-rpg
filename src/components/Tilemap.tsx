import React from "react";

import Tile from "../containers/Tile";

interface IilemapProps {
  tilemap: TTilemap;
}

export const Tilemap = (props: IilemapProps) => {
  const { tilemap } = props;

  return (
    <React.Fragment>
      {tilemap.map((row) => {
        return row.map((tile, index) => {
          const { id } = tile;

          return <Tile key={id} tile={tile} isFirst={index === 0} />;
        });
      })}
    </React.Fragment>
  );
};
