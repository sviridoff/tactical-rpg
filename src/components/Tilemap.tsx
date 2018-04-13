import * as React from 'react';

import { Tile } from './tile';

interface TilemapProps {
  grid: TTilemap;
  player: TPlayer;
  actors: TActors;
  updateActorCurrentPosition: (params: any) => any;
  updatePlayerSelectedActorId: (params: any) => any;
  updatePlayerViewActorId: (params: any) => any;
  hideActorArea: () => any;
}

export const Tilemap = ({
  grid,
  player,
  actors,
  updateActorCurrentPosition,
  updatePlayerSelectedActorId,
  updatePlayerViewActorId,
  hideActorArea,
}: TilemapProps) => {
  const { selectedActorId, viewActorId } = player;

  return (
    <React.Fragment>
      {grid.map(row =>
        row.map((tile, index) => {
          const { id, isMoveArea } = tile;

          return (
            <Tile
              key={id}
              onClick={() => {
                // Actor is not selected.
                if (!selectedActorId) {
                  return;
                }

                const actor = actors[selectedActorId];

                // If NOT is move area, set current position to the originalPosition.
                if (!isMoveArea) {
                  const { x, y } = actor.originalPosition;

                  updatePlayerSelectedActorId({ id: null });
                  updatePlayerViewActorId({ id: null });
                  hideActorArea();
                  updateActorCurrentPosition({
                    id: selectedActorId,
                    x,
                    y,
                  });

                  return;
                }

                const { x, y } = tile;

                // If selected actor is NOT viewed, view it,
                if (selectedActorId !== viewActorId) {
                  updatePlayerViewActorId({ id: selectedActorId });
                }

                // Update current position.
                updateActorCurrentPosition({
                  id: selectedActorId,
                  x,
                  y,
                });
              }}
              tile={tile}
              isFirst={index === 0}
            />
          );
        }),
      )}
    </React.Fragment>
  );
};
