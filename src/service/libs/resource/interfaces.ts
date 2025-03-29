import { IData } from '../data';

export type Resource = {
  name: string,
  schema: Record<string, any>,
  dbName: string
};

export type Config = {
  resources: Record<string, Resource>;
}

export type Client = Record<string, IData.Methods>;

export type Lib = (config: Config, data: IData.Client) => Promise<Client>;
