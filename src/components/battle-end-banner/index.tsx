import React from "react";

const styles = require("./index.css");

interface IBattleEndBanner {
  player: TPlayer;
}

class BattleEndBanner extends React.Component<IBattleEndBanner, {}> {
  public shouldComponentUpdate(nextProps: IBattleEndBanner) {
    return (
      nextProps.player.showBattleEndBanner !==
      this.props.player.showBattleEndBanner
    );
  }

  public render() {
    const { player } = this.props;
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
  }
}

export default BattleEndBanner;
