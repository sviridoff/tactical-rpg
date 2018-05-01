import React from "react";

const styles = require("./index.css");

interface IBattleEndBanner {
  player: TPlayer;
}

export default (props: IBattleEndBanner) => {
  const { player } = props;
  const title = player.isBattleWon ? "You win" : "You lose";

  return (
    player.showBattleEndBanner && (
      <div className={styles.wrapper}>
        <div className={styles.main}>
          <h1 className={styles.title}>{title}</h1>
        </div>
      </div>
    )
  );
};
