import {
  data,
  IData,
} from './data';
import {
  logger,
  ILogger,
} from './logger';
import {
  server,
  IServer,
} from './server';
import {
  openAI,
  IOpenAI,
} from './openAI';

export const libs = async (config) => {
  const loggerClient = logger(config.logger);
  return {
    logger: loggerClient,
    server: server(config.server, loggerClient),
    openAI: openAI(config.openAI),
    data: data(config.data),
  };
};

export {
  IData,
  ILogger,
  IServer,
  IOpenAI,
};
