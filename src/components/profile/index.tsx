import React from "react";

const styles = require("./index.css");

interface IProfileProps {
  activeActor: TActor;
  selectedActor: TActor;
  showActiveActor: boolean;
}

function createActorElement(actor: TActor): JSX.Element {
  return (
    <div className={styles.actorCard}>
      <div className={styles.actorName}>Cloud</div>
      <div className={styles.actorHp}>
        <div className={styles.actorHpTitle}>HP</div>
        <div className={styles.actorHpCurrent}>
          <div>{actor.healthPoints}</div>/{actor.totalHealthPoints}
        </div>
      </div>
      <div className={styles.actorStats}>
        <div>
          <div>
            Atk <div>{actor.damage}</div>
          </div>
          <div>
            Spd <div>10</div>
          </div>
        </div>
        <div>
          <div>
            Def <div>4</div>
          </div>
          <div>
            Res <div>6</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function createActorsElement(
  selectedActor: TActor,
  activeActor: TActor,
): JSX.Element {
  return (
    <div className={styles.actorsCard}>
      <div className={styles.actorsName}>
        <div>Cloud</div>
        <div>Sephiroth</div>
      </div>
      <div className={styles.actorsHp}>
        <div>24</div>
        <div>HP</div>
        <div>23</div>
      </div>
      <div className={styles.actorsAtk}>
        <div>8</div>
        <div>Atk</div>
        <div>0</div>
      </div>
    </div>
  );
}

export const Profile = (props: IProfileProps) => {
  const { activeActor, selectedActor, showActiveActor } = props;

  return (
    <div className={styles.main}>
      {!showActiveActor && selectedActor && createActorElement(selectedActor)}
      {showActiveActor &&
        activeActor &&
        createActorsElement(selectedActor, activeActor)}
    </div>
  );
};
