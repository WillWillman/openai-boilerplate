import { Libs, Route } from '../interfaces';
import { createHandler } from '../handlers';

export const createRoutes = (libs: Libs): Route[] =>
  Object
    .entries(libs.data.collection)
    .map(([resource, collection]) => ({
      path: `/api/${resource}`,
      method: 'post',
      handler: createHandler(collection),
    }));
