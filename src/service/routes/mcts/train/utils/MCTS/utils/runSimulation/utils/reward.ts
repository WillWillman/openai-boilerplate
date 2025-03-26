import { applyAction, getAvgScore, getRandomMapItem, isTerminal } from './utils';

interface RewardParams {
  gameState: any;
  actions: Map<string, <T>(state: T) => T>;
  depth: number;
  maxDepth: number;
}

interface RewardResult {
  rewarded: number;
}

export const reward = <T extends RewardParams>(config: T): T & RewardResult => {
  if (isTerminal(config))
    return {
      ...config,
      rewarded: getAvgScore(config.gameState.players)
    };

  const randomAction = getRandomMapItem(config.actions);

  return reward({
    ...config,
    gameState: applyAction(config.gameState, randomAction.call),
    depth: config.depth + 1,
  });
};
