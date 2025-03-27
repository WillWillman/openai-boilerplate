import { applyAction, isGameOver, isTerminal } from './utils';
import { createNode } from './createNode';

interface ExpandParams {
  node: any;
  gameState: any;
  depth: number;
  maxDepth: number;
  gameId: string;
  getValidAction: (config: ExpandParams) => <T>(state: T) => { name: string; call: T };
}

interface ExpandResult {
  node: any;
  gameState: any;
  depth: number;
}

export const expand = (config: ExpandParams): ExpandResult => {
  if (isTerminal(config) || isGameOver(config)) return config;

  const action = config.getValidAction(config);
  const gameState = applyAction(config.gameState, action.call);

  const node = createNode({
    ...config,
    action: action.name,
    gameState,
  });

  config.node.children.push(node);

  return {
    node,
    gameState,
    depth: config.depth + 1,
  };
};
