import { IDao, IServer } from '../interfaces';
import { trainSchema } from './schema';
import { collectNodes, MCTS } from './utils';

export const train = (dao: IDao, config): IServer.Route => ({
  path: '/api/mcts/train',
  method: IServer.Method.POST,
  schema: trainSchema,

  handler: async (req, res, next) => {
    const gameState = await dao.gameStates.read(req.body.gameStateId);

    const nodes = MCTS({
      ...gameState,
      ...req.body,
      actions: config.actions,
    })
      .flatMap(collectNodes)
      .map(dao.nodes.create)

    res.status(200).json(await Promise.all(nodes));

    return next();
  },
});
