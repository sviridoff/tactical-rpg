import React from "react";

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

        if (actor.isDead) {
          return null;
        }

        return (
          <Actor
            key={actor.id}
            actor={actor}
          />
        );
      })}
    </React.Fragment>
  );
};
