import React from "react";

import Actor from "../containers/Actor";

export interface IActorsProps {
  actors: TActors;
}

function Actors(props: IActorsProps) {
  const { actors } = props;

  return (
    <React.Fragment>
      {Object.keys(actors).map((key) => {
        const actor = actors[key];

        return <Actor key={actor.id} actor={actor} />;
      })}
    </React.Fragment>
  );
}

export default Actors;
