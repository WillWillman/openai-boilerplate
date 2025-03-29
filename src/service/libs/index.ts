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
import {
  resource,
  IResource,
} from './resource';

import { Lib, ILibs } from './interfaces';

export const libs: Lib = async (config) => {
  const dataClient = data(config.data);
  const loggerClient = logger(config.logger);
  const openAIClient = openAI(config.openAI);
  const resourceClient = await resource(config.resource, dataClient);
  const serverClient = server(config.server, loggerClient);

  const _libs = {
    data: dataClient,
    logger: loggerClient,
    openAI: openAIClient,
    resource: resourceClient,
    server: serverClient,
  };

  return _libs;
};

export {
  IData,
  ILogger,
  IServer,
  IOpenAI,
  IResource,
  ILibs,
};
