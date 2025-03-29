export const isGameOver = (config) =>
  config
    .gameState
    .players
    .some(player => player.victoryPoints >= 10);
