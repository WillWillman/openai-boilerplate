import { IServer } from '../../libs';
import { IDataWrapper } from './utils/dataWrapper';

export const remove = (libs: { data: Record<string, IDataWrapper.Client> }): IServer.Route[] =>
  Object
    .entries(libs.data)
    .filter(([_resource, data]) => data.removeOne)
    .map(([resource, data]) => ({
      path: `/api/resources/${resource}/:id`,
      method: IServer.Method.DELETE,

      handler: async (req, res, next) => {
        const response = await data.removeOne({ id: req.params.id });
        res.status(200).json(response);
        next();
      },
    }));
