import { collectNodes, MCTS } from './utils';

import { trainSchema } from './schema';
import { getValidAction } from './getValidAction';
import { ILibs, IServer } from '../../../libs';

export const train = (libs: ILibs.Client): IServer.Route => ({
  path: '/api/mcts/train',
  method: IServer.Method.POST,
  schema: trainSchema,

  handler: async (req, res, next) => {
    const gameState = await libs.resource.gameStates.read(req.body.gameStateId);

    const nodes = MCTS({
      ...gameState,
      ...req.body,
      getValidAction,
    })
      .flatMap(collectNodes)
      .map(libs.resource.nodes.create)

    res.status(200).json(await Promise.all(nodes));

    return next();
  },
});
