import { randomUUID } from 'crypto';
import { IServer } from '../../libs';
import { IDataWrapper } from './utils/dataWrapper';

export const create = (resources: Record<string, IDataWrapper.Client>): IServer.Route[] =>
  Object
    .entries(resources)
    .filter(([_resource, data]) => data.create)
    .map(([resource, data]) => ({
      path: `/api/resources/${resource}`,
      method: IServer.Method.POST,

      schema: {
        body: data.schema.body,
      },

      handler: async (req, res, next) => {
        const response = await data.create({
          ...req.body,
          id: randomUUID(),
        });
        res.status(200).json(response);
        next();
      },
    }));
