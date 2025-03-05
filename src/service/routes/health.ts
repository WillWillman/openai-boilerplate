import { Libs, Route } from '../interfaces';
import { healthHandler } from '../handlers';

export const healthRoutes = (libs: Libs): Route[] => [
  {
    path: '/api/health',
    method: 'get',
    handler: healthHandler(libs),
  },
];
