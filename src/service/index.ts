import { libs } from './libs';
import { routes } from './routes';
import { config } from '../config/service-config';

libs(config)
  .then(libs => routes(libs, config).then(libs.server))
  .catch(console.error);
