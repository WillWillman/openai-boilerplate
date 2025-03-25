import { applyAction } from './applyAction';
import { getAvailableActions } from './getAvailableActions';
import { isTerminal } from './isTerminal';

export const simulation = (state, depth, maxDepth, extensionActions) => {
  let currentState = JSON.parse(JSON.stringify(state));
  let currentDepth = depth;
  const actions = getAvailableActions(currentState, extensionActions);
  while (!isTerminal(currentState, currentDepth, maxDepth)) {
    const action = actions[Math.floor(Math.random() * actions.length)];
    currentState = applyAction(currentState, action);
    currentDepth++;
  }

  const calculatePlayerScore = (player) => {
    const resourceScore = Object.values(player.resources).reduce((acc: number, count: number) => acc + count, 0);
    return player.victoryPoints + resourceScore;
  };
  const scores = currentState.players.map(calculatePlayerScore);
  return scores.reduce((acc, score) => acc + score, 0) / currentState.players.length;
};
