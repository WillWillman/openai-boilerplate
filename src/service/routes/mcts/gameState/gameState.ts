import { randomUUID } from 'crypto';
import { gameStateSchema } from '../schemas';
import { IDao, IServer } from '../interfaces';

export const create = (dao: IDao): IServer.Route => ({
  path: '/api/mcts/gameState',
  method: IServer.Method.POST,
  schema: {
    body: gameStateSchema,
  },

  handler: async (req, res, next) => {
    res
      .status(200)
      .json(await dao.gameStates.create({
        id: req.body.id || randomUUID(),
        ...req.body,
      }));

    return next();
  }
});
