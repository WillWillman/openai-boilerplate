import { IDao, IServer } from '../interfaces';

export const list = (dao: IDao): IServer.Route => ({
  path: '/api/mcts/nodes',
  method: IServer.Method.GET,
  schema: {
    query: {
      gameId: { type: 'string' },
    },
  },

  handler: async (req, res, next) => {
    res
      .status(200)
      .json(await dao.nodes.list(req.query));

    return next();
  }
});
