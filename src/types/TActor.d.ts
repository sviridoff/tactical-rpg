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
  teamName: string;
  healthPoints: number;
  totalHealthPoints: number;
  damage: number;
  isDead: boolean;
  isAttackTarget: boolean;
  isDisable: boolean;
};
