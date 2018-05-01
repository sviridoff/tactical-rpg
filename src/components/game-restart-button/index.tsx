import React from "react";

const styles = require("./index.css");

interface IGameRestartButtonProps {
  restartGame: () => void;
}

export default (props: IGameRestartButtonProps) => {
  const onClick = () => props.restartGame();

  return (
    <a className={styles.main} onClick={onClick}>
      Restart
    </a>
  );
};
