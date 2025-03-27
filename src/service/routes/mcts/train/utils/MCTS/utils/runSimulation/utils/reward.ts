import { applyAction, getAvgScore, isGameOver, isTerminal } from './utils';

interface RewardParams {
  gameState: any;
  depth: number;
  maxDepth: number;
  getValidAction: (config: RewardParams) => <T>(state: T) => { name: string; call: T };
}

interface RewardResult {
  rewarded: number;
}

export const reward = <T extends RewardParams>(config: T): T & RewardResult => {
  if (isTerminal(config) || isGameOver(config))
    return {
      ...config,
      rewarded: getAvgScore(config.gameState.players)
    };

  const action = config.getValidAction(config);

  return reward({
    ...config,
    gameState: applyAction(config.gameState, action.call),
    depth: config.depth + 1,
  });
};
