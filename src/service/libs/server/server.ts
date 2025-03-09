import Express from 'express';
import {
  addJsonBodyToRes,
  onListen,
  onRequestLogger,
  onResponseLogger,
  servePublic,
  validateSchema,
} from './utils';
import { ExpressWrapper, Lib } from './interfaces';

export const server: Lib = (config, logger) => (routes) => {
  const client = Express() as ExpressWrapper;

  client.use(Express.json());
  client.use(addJsonBodyToRes);

  routes.forEach((route) => {
    client[route.method](
      route.path,
      onRequestLogger(logger, config),
      validateSchema(route.schema),
      route.handler,
      onResponseLogger(logger, config),
    );
  });

  client.get(
    '*',
    onRequestLogger(logger, config),
    servePublic,
    onResponseLogger(logger, config),
  );

  const http = client.listen(config.port, onListen(config));

  client.close = async () => {
    await new Promise(http.close);
  };

  return client;
};
