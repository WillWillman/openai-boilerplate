import { backPropagate, createNode, expand, reward, traverse } from './utils';
const pipe = (...fns) => (root) => fns.reduce((acc, fn) => fn({ ...root, ...acc }), root);

export interface RunSimulationParams {
  gameState: any;
  maxDepth: number;
  explorationConstant: number;
  gameId: string;
  actions: Map<string, <T>(state: T) => T>;
}

export const runSimulation = (config: RunSimulationParams) => {
  const root = {
    ...config,
    node: createNode(config),
    depth: 0,
  };

  pipe(
    traverse,
    expand,
    reward,
    backPropagate,
  )(root);

  return root.node;
};
