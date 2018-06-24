import React from "react";
import { Link } from "react-router-dom";

const styles = require("./index.css");

interface IHomeProps {
  actors: TActors;
  player: TPlayer;
  addSelectedActor: (actor: TActor) => void;
  removeSelectedActor: (actor: TActor) => void;
}

function Home(props: IHomeProps) {
  const {
    actors,
    addSelectedActor,
    player: { selectedActors },
    removeSelectedActor
  } = props;

  return (
    <div className={styles.main}>
      <h1>Selected characters</h1>
      <ul>
        {Object.values(selectedActors).map(actor => {
          return (
            <li key={actor.id}>
              <a onClick={removeSelectedActor.bind(this, actor)}>
                {actor.name}
              </a>
            </li>
          );
        })}
      </ul>
      <h1>Select character</h1>
      <ul>
        {Object.values(actors).map(actor => {
          return (
            <li key={actor.id}>
              <a onClick={addSelectedActor.bind(this, actor)}>{actor.name}</a>
            </li>
          );
        })}
      </ul>
      <Link to="/match" className={styles.button}>
        Match
      </Link>
    </div>
  );
}

export default Home;
