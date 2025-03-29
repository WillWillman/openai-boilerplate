import Express from 'express';
import { RequestHandler } from 'express';
import { ILogger } from '../logger';
import { IData } from '../data';

export enum Method {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch',
  OPTIONS = 'options',
  HEAD = 'head',
}

export type Handler = (resourceData: IData.Client) => RequestHandler;

export type Route = {
  path: string;
  method: Method;
  handler: RequestHandler;
  schema?: {
    body?: Record<string, any>;
    query?: Record<string, any>;
  };
};

export type ExpressWrapper = ReturnType<typeof Express> & { close: () => void };

export type Config = {
  port: number;
  env: string;
  onRequestLogger: {
    enabled: boolean,
    logBody: boolean,
    logHeaders: boolean,
  },
  onResponseLogger: {
    enabled: boolean,
    logBody: boolean,
    logHeaders: boolean,
  },
};
export type Client = (routes: Route[]) => ExpressWrapper;
export type Lib = (config: { port: number }, logger: ILogger.Client) => Client;
