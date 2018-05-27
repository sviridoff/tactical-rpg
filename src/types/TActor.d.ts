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
  attack: number;
  defense: number;
  hp: number;
  image: string;
  isDead: boolean;
  isDisable: boolean;
  isEnemy: boolean;
  isGoingToAttack: boolean;
  isGoingToBeAttacked: boolean;
  name: string;
  resistance: number;
  speed: number;
  totalHp: number;
};
