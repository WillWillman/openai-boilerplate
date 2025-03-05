import { Libs, Route } from '../interfaces';
import { updateHandler } from '../handlers';

export const updateRoutes = (libs: Libs): Route[] =>
  Object
    .entries(libs.data.collection)
    .map(([resource, collection]) => ({
      path: `/api/${resource}/:id`,
      method: 'put',
      handler: updateHandler(collection),
    }));
