
import { IData } from './data';
import { ILogger } from './logger';
import { IServer } from './server';
import { IOpenAI } from './openAI';
import { IResource } from './resource';

export type Config = {
  logger: ILogger.Config;
  server: IServer.Config;
  openAI: IOpenAI.Config;
  data: IData.Config;
  resource: IResource.Config;
};

export type Client = {
  logger: ILogger.Client;
  server: IServer.Client;
  openAI: IOpenAI.Client;
  data: IData.Client;
  resource: IResource.Client;
};

export type Lib = (config: Config) => Promise<Client>;

export * as ILibs from './interfaces';
