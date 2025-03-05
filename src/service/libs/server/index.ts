import Express from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';

let runningServer;

const server = ({
  logger,
  port,
  routes,
}) => {

  const client = Express();

  client.use(Express.json());

  routes.forEach((route) => {
    client[route.method](route.path, route.handler);
  });

  client.use(Express.static(join(__dirname, '..', 'public')));

  client.use(Express.json());

  client.use((req, res, next) => {
    logger('Request Received')(req);
    next();
  });

  client.all('*', (req, res) => {
    const filePath = req.path === '/'
      ? join(__dirname, '..', '..', '..', 'public', 'index.html')
      : join(__dirname, '..', '..', '..', 'public', req.path);

    if (req.path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
    res.statusCode = 200;
    return res.end(readFileSync(filePath));
  });

  runningServer = client.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

  return client;
};

server.close = async () => {
  await runningServer?.close?.();
};

export {
  server
};