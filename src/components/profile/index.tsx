import React from "react";

const styles = require("./index.css");

interface IProfileProps {
  activeActor: TActor;
  selectedActor: TActor;
  showActiveActor: boolean;
}

function createActorElement(
  actor: TActor,
  avatarRef: React.RefObject<HTMLDivElement>,
): JSX.Element {
  return (
    <div
      className={[styles.actorCard, actor.isEnemy && styles.isEnemy].join(" ")}
    >
      <div
        ref={avatarRef}
        className={[
          styles.avatarAnimation,
          styles.avatar,
          styles[actor.image],
        ].join(" ")}
      />
      <div className={styles.content}>
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
    </div>
  );
}

function createActorsElement(
  selectedActor: TActor,
  activeActor: TActor,
): JSX.Element {
  return (
    <div className={styles.actorsCard}>
      <div className={styles.background} />
      <div className={styles.enemyBackground} />
      <div
        className={[
          styles.avatarAnimation,
          styles.avatar,
          styles[activeActor.image],
        ].join(" ")}
      />
      <div
        className={[styles.enemyAvatar, styles[selectedActor.image]].join(" ")}
      />
      <div className={styles.actorsContent}>
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
    </div>
  );
}

function Profile(props: IProfileProps) {
  const { activeActor, selectedActor, showActiveActor } = props;
  const avatarRef: React.RefObject<HTMLDivElement> = React.createRef();
  const timer = setTimeout(() => {
    // tslint:disable-next-line no-unused-expression
    avatarRef.current &&
      avatarRef.current.classList.remove(styles.avatarAnimation);
    clearTimeout(timer);
  }, 200);

  return (
    <div className={styles.main}>
      {!showActiveActor &&
        selectedActor &&
        createActorElement(selectedActor, avatarRef)}
      {showActiveActor &&
        activeActor &&
        createActorsElement(selectedActor, activeActor)}
    </div>
  );
}

export default Profile;
