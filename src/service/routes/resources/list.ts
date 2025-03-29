import { IServer } from '../../libs';
import { ILibs } from '../../libs';

export const list = (libs: ILibs.Client): IServer.Route[] =>
  Object
    .entries(libs.resource)
    .filter(([_resource, data]) => data.list)
    .map(([resource, data]) => ({
      path: `/api/${data.dbName}/${resource}`,
      method: IServer.Method.GET,

      schema: {
        query: data.schema.query,
      },

      handler: async (req, res, next) => {
        const response = await data.list(req.query);
        res.status(200).json(response);
        next();
      },
    }));
