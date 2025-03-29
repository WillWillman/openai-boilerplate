import { randomUUID } from 'crypto';
import { IServer } from '../../libs';
import { ILibs } from '../../libs';

export const create = (libs: ILibs.Client): IServer.Route[] =>
  Object
    .entries(libs.resource)
    .filter(([_resource, data]) => data.create)
    .map(([resource, data]) => ({
      path: `/api/${data.dbName}/${resource}`,
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
