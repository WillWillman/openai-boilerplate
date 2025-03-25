import { IDao, IServer } from './interfaces';
import { trainSchema } from './schemas';
import { MCTS } from './MCTS';

const save = (dataMethods, array) => Promise.all(array.map(dataMethods.create));

export const train = (dao: IDao): IServer.Route => ({
  path: '/api/mcts/train',
  method: IServer.Method.POST,
  schema: trainSchema,

  handler: async (req, res, next) => {
    const gameState = await dao.gameStates.read(req.body.gameStateId);
    if (!gameState) {
      res.status(404).json({ error: 'Game state not found' });
      return next();
    };
    const mcts = MCTS({
      ...gameState,
      ...req.body,
    });

    res.status(200).json({
      mctsNodes: await save(dao.nodes, mcts.sanitizedNodes),
      simulationResults: await save(dao.simulationResults, mcts.simulationResults),
    });
    return next();
  },
});
