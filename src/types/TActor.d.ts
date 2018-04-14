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
  healtPoints: number;
  totalHealthPoints: number;
  damage: number;
};
