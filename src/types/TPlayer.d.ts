type TPlayer = {
  activeActorId: string;
  selectedActorId: string;
  isPlayerTurn: boolean;
  showTurnBanner: boolean;
  showBattleEndBanner: boolean;
  isBattleWon: boolean;
  selectedActors: TActors;
};
