import { Libs, Route } from '../interfaces';
import { listHandler } from '../handlers';

export const listRoutes = (libs: Libs): Route[] =>
  Object
    .entries(libs.data.collection)
    .map(([resource, collection]) => ({
      path: `/api/${resource}`,
      method: 'get',
      handler: listHandler(collection),
    }));
