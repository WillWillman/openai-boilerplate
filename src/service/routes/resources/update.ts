import { IServer } from '../../libs';
import { ILibs } from '../../libs';

export const update = (libs: ILibs.Client): IServer.Route[] =>
  Object
    .entries(libs.resource)
    .filter(([_resource, data]) => data.update)
    .map(([resource, data]) => ({
      path: `/api/${data.dbName}/${resource}`,
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
