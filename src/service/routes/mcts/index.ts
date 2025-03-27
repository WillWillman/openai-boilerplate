import { gameState } from './gameState';
import { nodes } from './nodes';
import * as train from './train';
import {
  gameStateSchema,
  nodesSchema,
} from './schemas';

export const mcts = async (libs, _config) => {
  const dao = {
    gameStates: await libs.data('gameStates', gameStateSchema, 'mcts'),
    nodes: await libs.data('nodes', nodesSchema, 'mcts'),
  };

  return [
    train.train(dao),
    nodes.list(dao),
    gameState.create(dao),
  ]
};
