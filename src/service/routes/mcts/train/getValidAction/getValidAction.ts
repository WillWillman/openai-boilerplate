import { actions, MinimumGameState } from './actions';

const getRandomMapItem = (Map: Map<string, any>) => {
  const keys = Array.from(Map.keys());
  const randomKey = keys[Math.floor(Math.random() * keys.length)];
  return {
    name: randomKey,
    call: Map.get(randomKey)
  };
};


export const getValidAction = (config: { gameState: MinimumGameState }) => {
  const activePlayer = config.gameState.players.find(p => p.playerId === config.gameState.activePlayerId);
  const validActions = new Map();

  validActions.set('rollDice', actions.get('rollDice'));
  validActions.set('endTurn', actions.get('endTurn'));

  if (activePlayer.resources.brick >= 1 && activePlayer.resources.lumber >= 1) {
    validActions.set('buildRoad', actions.get('buildRoad'));
  }

  // Add other conditional actions...

  return getRandomMapItem(validActions);
};
