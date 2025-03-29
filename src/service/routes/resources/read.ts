import { IServer } from '../../libs';
import { ILibs } from '../../libs';

export const read = (libs: ILibs.Client): IServer.Route[] =>
  Object
    .entries(libs.resource)
    .filter(([_resource, data]) => data.read)
    .map(([resource, data]) => ({
      path: `/api/${data.dbName}/${resource}/:id`,

      method: IServer.Method.GET,

      handler: async (req, res, next) => {
        const response = await data.read(req.params.id);
        if (!response) throw new Error('Not found');
        res.status(200).json(response);
        next();
      },
    }));
