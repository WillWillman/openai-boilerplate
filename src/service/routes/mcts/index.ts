import { createGameState } from './createGameState';
import { train } from './train';
import { listTrainingResults } from './listTrainingResults';
import {
  gameStateSchema,
  nodesSchema,
  trainingResultsSchema
} from './schemas';

export const mcts = async (libs, _config) => {
  const dao = {
    gameStates: await libs.data('gameStates', gameStateSchema, 'mcts'),
    nodes: await libs.data('nodes', nodesSchema, 'mcts'),
    simulationResults: await libs.data('simulationResults', trainingResultsSchema, 'mcts'),
  };
  return [
    train(dao),
    createGameState(dao),
    listTrainingResults(dao),
  ]
};
