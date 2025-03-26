export const actions = new Map<string, <T>(state) => T>()
  .set('robber', (state) => {
    const randomPlayerIndex = Math.floor(Math.random() * state.players.length);
    state.players[randomPlayerIndex].resources.brick = Math.max(0, state.players[randomPlayerIndex].resources.brick - 1);
    return state;
  })
  .set('trade', (state) => {
    state.players.forEach((player) => player.resources.lumber += 1);
    return state;
  });
