import * as Data from '../../../../libs/data';

export type Client = {
  schema: Record<string, any>;
  config: Record<string, any>;
  close: () => Promise<void>;
  count: (query: Record<string, any>) => Promise<number>;
  create: (doc: Record<string, any>) => Promise<any>;
  read: (id: string) => any;
  list: (query: Record<string, any>) => Promise<any[]>;
  update: (doc: Record<string, any>) => Promise<any>;
  upsert: (doc: Record<string, any>) => Promise<any>;
  removeOne: (doc: Record<string, any>) => Promise<any>;
};

export type Config = {
  resources: Record<string, any>[];
}

export type Lib = (config: Config, data: Data.IData.Client) => Promise<Record<string, Client>>;
