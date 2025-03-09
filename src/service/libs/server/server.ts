import Express from 'express';
import {
  onListen,
  onRequestLogger,
  servePublic,
  validateSchema,
} from './utils';
import { ExpressWrapper, Lib } from './interfaces';

export const server: Lib = (config, logger) => (routes) => {
  const client = Express() as ExpressWrapper;

  client.use(Express.json());

  routes.forEach((route) => {
    client[route.method](
      route.path,
      validateSchema(route.schema),
      route.handler,
    );
  });

  client.use(onRequestLogger(logger));

  client.all('*', servePublic);

  const http = client.listen(config.port, onListen(config));

  client.close = async () => {
    await new Promise(http.close);
  };

  return client;
};
