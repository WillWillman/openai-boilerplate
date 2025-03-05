import { createRoutes } from './create';
import { healthRoutes } from './health';
import { listRoutes } from './list';
import { readRoutes } from './read';
import { updateRoutes } from './update';

export const routes = (libs) => [
    ...createRoutes(libs),
    ...healthRoutes(libs),
    ...listRoutes(libs),
    ...readRoutes(libs),
    ...updateRoutes(libs),
];
