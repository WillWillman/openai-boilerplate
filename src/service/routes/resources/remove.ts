import { IServer } from '../../libs';
import { ILibs } from '../../libs';

export const remove = (libs: ILibs.Client): IServer.Route[] =>
  Object
    .entries(libs.resource)
    .filter(([_resource, data]) => data.removeOne)
    .map(([resource, data]) => ({
      path: `/api/${data.dbName}/${resource}/:id`,
      method: IServer.Method.DELETE,

      handler: async (req, res, next) => {
        const response = await data.removeOne({ id: req.params.id });
        res.status(200).json(response);
        next();
      },
    }));
