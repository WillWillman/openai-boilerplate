import { IServer } from '../../libs';
import { IDataWrapper } from './utils/dataWrapper';

export const list = (libs: { data: Record<string, IDataWrapper.Client> }): IServer.Route[] =>
  Object
    .entries(libs.data)
    .filter(([_resource, data]) => data.list)
    .map(([resource, data]) => ({
      path: `/api/resources/${resource}`,
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
