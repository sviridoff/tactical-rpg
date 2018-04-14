import * as React from "react";

import Actor from "../containers/Actor";

export interface IActorsProps {
  actors: TActors;
  player: TPlayer;
}

export const Actors = (props: IActorsProps) => {
  const { actors, player } = props;

  return (
    <React.Fragment>
      {Object.keys(actors).map((key) => {
        const actor = actors[key];
        const { id } = actor;
        const { selectedActorId } = player;

        return (
          <Actor
            key={id}
            actor={actor}
            isSelectedArea={selectedActorId === id}
          />
        );
      })}
    </React.Fragment>
  );
};
