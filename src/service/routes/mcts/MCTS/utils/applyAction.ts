export const applyAction = (state, action) => {
  const newState = JSON.parse(JSON.stringify(state));
  if (action === 'robber') {
    const randomPlayerIndex = Math.floor(Math.random() * newState.players.length);
    newState.players[randomPlayerIndex].resources.brick = Math.max(0, newState.players[randomPlayerIndex].resources.brick - 1);
  } else if (action === 'trade') {
    newState.players.forEach((player) => {
      player.resources.lumber += 1;
    });
  }
  return newState;
};
