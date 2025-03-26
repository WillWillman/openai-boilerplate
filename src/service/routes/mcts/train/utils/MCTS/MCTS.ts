import { runSimulation } from './utils';

interface MCTSParams {
  gameId: string;
  gameState: any;
  count: number;
  explorationConstant: number;
  maxDepth: number;
  actions: Map<string, <T>(state: T) => T>;
};

export const MCTS = (config: MCTSParams) =>
  Array(config.count)
    .fill(config)
    .map(runSimulation);
