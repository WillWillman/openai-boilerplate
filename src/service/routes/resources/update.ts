import { IServer } from '../../libs';
import { IDataWrapper } from './utils/dataWrapper';

export const update = (libs: { data: Record<string, IDataWrapper.Client> }): IServer.Route[] =>
  Object
    .entries(libs.data)
    .filter(([_resource, data]) => data.update)
    .map(([resource, data]) => ({
      path: `/api/resources/${resource}`,
      method: IServer.Method.PUT,

      schema: {
        body: {
          ...data.schema.body,
          required: [...data.schema.body.required, 'id'],
        },
      },

      handler: async (req, res, next) => {
        const response = await data.update(req.body);
        res.status(200).json(response);
        next();
      },
    }));
