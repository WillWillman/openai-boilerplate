import { IDao, IServer } from '../interfaces';
import { collectNodes, MCTS } from './utils';

import { trainSchema } from './schema';
import { getValidAction } from './getValidAction';

export const train = (dao: IDao): IServer.Route => ({
  path: '/api/mcts/train',
  method: IServer.Method.POST,
  schema: trainSchema,

  handler: async (req, res, next) => {
    const gameState = await dao.gameStates.read(req.body.gameStateId);

    const nodes = MCTS({
      ...gameState,
      ...req.body,
      getValidAction,
    })
      .flatMap(collectNodes)
      .map(dao.nodes.create)

    res.status(200).json(await Promise.all(nodes));

    return next();
  },
});
