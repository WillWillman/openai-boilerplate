import * as Interfaces from '../interfaces';
import { routes } from '../routes';

export const server = (port: number) => async (libs: Interfaces.Libs) => {
  libs.server({
    port: port,
    logger: libs.logger,
    routes: routes(libs),
  });
};
