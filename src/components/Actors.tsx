import * as React from 'react';

import { Actor } from './actor';

export interface ActorsProps {
  actors: TActors;
  player: TPlayer;
  grid: TTilemap;
  updatePlayerSelectedActorId: (param: any) => any;
  updatePlayerViewActorId: (param: any) => any;
  showActorArea: (param: any) => any;
  hideActorArea: () => any;
  updateActorOriginalPosition: (param: any) => any;
}

export const Actors = ({
  actors,
  player,
  grid,
  updatePlayerSelectedActorId,
  updatePlayerViewActorId,
  showActorArea,
  hideActorArea,
  updateActorOriginalPosition,
}: ActorsProps) => (
  <React.Fragment>
    {Object.keys(actors).map(key => {
      const { id, currentPosition: { x, y } } = actors[key];
      const cell = grid[y][x];
      const { selectedActorId, viewActorId } = player;

      return (
        <Actor
          key={id}
          actor={actors[key]}
          isSelectedArea={selectedActorId === id}
          onClick={() => {
            // Is actor NOT selected.
            if (!selectedActorId) {
              const cells = Object.keys(actors).map(key => ({
                x: actors[key].originalPosition.x,
                y: actors[key].originalPosition.y,
              }));

              updatePlayerSelectedActorId({ id });
              updatePlayerViewActorId({ id });
              showActorArea({ cell, cells });

              return;
            }

            // Is another actor selected or viewed.
            if (selectedActorId !== id || viewActorId !== id) {
              updatePlayerViewActorId({ id });

              return;
            }

            // Is selected, we update the originalPosition position.
            hideActorArea();
            updateActorOriginalPosition({ id, x, y });
            updatePlayerSelectedActorId({ id: null });
            updatePlayerViewActorId({ id: null });
          }}
        />
      );
    })}
  </React.Fragment>
);
