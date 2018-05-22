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
      <div className={styles.actorName}>{actor.name}</div>
      <div className={styles.actorHp}>
        <div className={styles.actorHpTitle}>HP</div>
        <div className={styles.actorHpCurrent}>
          <div>{actor.hp}</div>/{actor.totalHp}
        </div>
      </div>
      <div className={styles.actorStats}>
        <div>
          <div>
            Atk <div>{actor.attack}</div>
          </div>
          <div>
            Spd <div>{actor.speed}</div>
          </div>
        </div>
        <div>
          <div>
            Def <div>{actor.defense}</div>
          </div>
          <div>
            Res <div>{actor.resistance}</div>
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
        <div>{activeActor.name}</div>
        <div>{selectedActor.name}</div>
      </div>
      <div className={styles.actorsHp}>
        <div>{activeActor.hp}</div>
        <div>HP</div>
        <div>{selectedActor.hp}</div>
      </div>
      <div className={styles.actorsAtk}>
        <div>{activeActor.attack - selectedActor.defense}</div>
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
