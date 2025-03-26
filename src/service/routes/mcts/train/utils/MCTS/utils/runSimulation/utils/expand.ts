import { applyAction, getRandomMapItem, isTerminal } from './utils';
import { createNode } from './createNode';

interface ExpandParams {
  node: any;
  gameState: any;
  depth: number;
  maxDepth: number;
  actions: Map<string, <T>(state: T) => T>;
  gameId: string;
}

interface ExpandResult {
  node: any;
  gameState: any;
  depth: number;
}

export const expand = (config: ExpandParams): ExpandResult => {
  if (isTerminal(config)) return config;

  const randomAction = getRandomMapItem(config.actions);
  const gameState = applyAction(config.gameState, randomAction.call);

  const node = createNode({
    ...config,
    action: randomAction.name,
    gameState,
  });

  config.node.children.push(node);

  return {
    node,
    gameState,
    depth: config.depth + 1,
  };
};
