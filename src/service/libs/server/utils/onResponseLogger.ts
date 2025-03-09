import { ILogger } from '../../../libs';

export const onResponseLogger = (logger: ILogger.Client, config) => (req, res, _next) => {
  req.duration = Date.now() - req.requestStartTime;
  const { enabled, logHeaders, logBody } = config.onResponseLogger;

  enabled && logger.info(`Sent: ${req.method} ${req.path} in ${req.duration}ms `, logHeaders || logBody)({
    method: req.method,
    path: req.path,
    query: req.query,
    url: req.url,
    correlationId: req.correlationId,
    requestStartTime: req.requestStartTime,
    duration: req.duration,
    ...logHeaders && { headers: res.getHeaders() },
    ...logBody && { body: res.body },
  });
};
