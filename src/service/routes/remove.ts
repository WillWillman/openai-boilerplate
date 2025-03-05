import { Libs, Route } from '../interfaces';
import { removeHandler } from '../handlers';

export const removeRoutes = (libs: Libs): Route[] =>
  Object
    .entries(libs.data.collection)
    .map(([resource, collection]) => ({
      path: `/api/${resource}/:id`,
      method: 'delete',
      handler: removeHandler(collection),
    }));
