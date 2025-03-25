import { IDao, IServer } from './interfaces';
import { listSchema } from './schemas';

export const listNodes = (dao: IDao): IServer.Route => ({
  path: '/api/mcts/nodes',
  method: IServer.Method.GET,
  schema: listSchema,

  handler: async (req, res, next) => {
    res
      .status(200)
      .json(await dao.nodes.list(req.query));

    return next();
  }
});
