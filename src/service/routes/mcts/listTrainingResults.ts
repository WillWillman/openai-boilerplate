import { IDao, IServer } from './interfaces';
import { listSchema } from './schemas';

export const listTrainingResults = (dao: IDao): IServer.Route => ({
  path: '/api/mcts/simulationResults',
  method: IServer.Method.GET,
  schema: listSchema,

  handler: async (req, res, next) => {
    res
      .status(200)
      .json(await dao.simulationResults.list(req.query));

    return next();
  }
});
