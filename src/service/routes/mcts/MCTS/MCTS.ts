import { randomUUID } from 'crypto';
import {
  applyAction,
  backPropagate,
  collectNodes,
  createNode,
  getAvailableActions,
  isTerminal,
  simulation,
  selectChild,
  sanitizeNode,
} from './utils';

export const MCTS = ({
  gameId,
  gameState,
  simulationCount,
  explorationConstant,
  extensionActions,
  maxDepth,
}) => {
  const root = createNode(gameId, gameState, null, null);
  const simulationResults = [];
  for (let i = 0; i < simulationCount; i++) {
    let node = root;
    let state = JSON.parse(JSON.stringify(gameState));
    let depth = 0;

    while (node.children.length > 0 && !isTerminal(state, depth, maxDepth)) {
      node = selectChild(node, explorationConstant);
      state = applyAction(state, node.action);
      depth++;
    }

    if (!isTerminal(state, depth, maxDepth)) {
      const actions = getAvailableActions(state, extensionActions);
      if (actions.length > 0) {
        const action = actions[Math.floor(Math.random() * actions.length)];
        state = applyAction(state, action);
        const childNode = createNode(gameId, state, action, node);
        node.children.push(childNode);
        node = childNode;
        depth++;
      }
    }
    const reward = simulation(state, depth, maxDepth, extensionActions);
    simulationResults.push({ simulationIndex: i, reward, gameId: node.gameId, id: randomUUID() });
    backPropagate(node, reward);
  }

  const nodes = collectNodes(root);
  return {
    root,
    simulationResults,
    nodes,
    sanitizedNodes: nodes.map(sanitizeNode)
  };
};
