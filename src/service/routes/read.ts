import { Libs, Route } from '../interfaces';
import { readHandler } from '../handlers';

export const readRoutes = (libs: Libs): Route[] =>
  Object
    .entries(libs.data.collection)
    .map(([resource, collection]) => ({
      path: `/api/${resource}/:id`,
      method: 'get',
      handler: readHandler(collection),
    }));
