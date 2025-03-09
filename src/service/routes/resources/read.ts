import { IServer } from '../../libs';
import { IDataWrapper } from './utils/dataWrapper';

export const read = (libs: { data: Record<string, IDataWrapper.Client> }): IServer.Route[] =>
  Object
    .entries(libs.data)
    .filter(([_resource, data]) => data.read)
    .map(([resource, data]) => ({
      path: `/api/resources/${resource}/:id`,

      method: IServer.Method.GET,

      handler: async (req, res) => {
        const response = await data.read(req.params.id);
        if (!response) throw new Error('Not found');
        return res.status(200).json(response);
      },
    }));
