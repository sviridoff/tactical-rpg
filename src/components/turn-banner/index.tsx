import React from "react";

const styles = require("./index.css");

interface ITurnBannerProps {
  player: TPlayer;
}

function TurnBanner(props: ITurnBannerProps) {
  const { player } = props;
  const title = player.isPlayerTurn ? "Your turn" : "Enemy turn";

  return (
    player.showTurnBanner && (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    )
  );
}

export default TurnBanner;
