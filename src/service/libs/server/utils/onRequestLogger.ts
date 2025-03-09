import { randomUUID } from 'crypto';
import { ILogger } from '../../../libs';

export const onRequestLogger = (logger: ILogger.Client, config) => (req, _res, next) => {
  req.requestStartTime = Date.now();
  req.correlationId = req.correlationId || randomUUID();

  const { enabled, logHeaders, logBody } = config.onRequestLogger;

  enabled && logger.info(`Received: ${req.method} ${req.path}`, logHeaders || logBody)({
    method: req.method,
    path: req.path,
    query: req.query,
    url: req.url,
    requestStartTime: req.requestStartTime,
    correlationId: req.correlationId,
    ...config.onRequestLogger.logHeaders && { headers: req.headers },
    ...config.onRequestLogger.logBody && { body: req.body },
  });
  next();
};
