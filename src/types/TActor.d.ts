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
};
