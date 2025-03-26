import { applyAction, isLeaf, isTerminal, selectChild } from './utils';

interface TraverseParams {
  node: {
    children: Array<{ action: any }>;
  };
  gameState: any;
  depth: number;
  maxDepth: number;
  explorationConstant: number;
}

export const traverse = (config: TraverseParams) => {
  if (isTerminal(config) || isLeaf(config)) return config;

  const node = selectChild(config);
  const gameState = applyAction(config.gameState, node.action.call);

  return traverse({
    node,
    gameState,
    depth: config.depth + 1,
    ...config,
  });
};
