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
  const addSelectedActorHandler = (actor: TActor) => () => {
    if (Object.keys(selectedActors).length < 2) {
      addSelectedActor(actor);
    }
  };

  return (
    <div className={styles.main}>
      <h1>Selected characters</h1>
      <ul className={styles.portraits}>
        {Object.values(selectedActors).map(actor => {
          return (
            <li key={actor.id}>
              <a
                className={styles.portrait}
                onClick={removeSelectedActor.bind(this, actor)}
              >
                {actor.name}
              </a>
            </li>
          );
        })}
      </ul>
      <h1>Select character</h1>
      <ul className={styles.portraits}>
        {Object.values(actors).map(actor => {
          return (
            <li key={actor.id}>
              <a
                className={styles.portrait}
                onClick={addSelectedActorHandler(actor)}
              >
                {actor.name}
              </a>
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
