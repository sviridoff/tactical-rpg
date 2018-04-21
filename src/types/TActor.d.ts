type TActor = {
  id: string;
  originalPosition: {
    x: number;
    y: number;
  };
  currentPosition: {
    x: number;
    y: number;
  };
  healthPoints: number;
  totalHealthPoints: number;
  damage: number;
  isDead: boolean;
  isGoingToBeAttacked: boolean;
  isGoingToAttack: boolean;
  isDisable: boolean;
  isEnemy: boolean;
};
