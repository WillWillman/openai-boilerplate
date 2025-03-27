import { MongoOptions } from 'mongodb';

export type Methods = {
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

export type Client = (collectionName: string, schema?: Record<string, any>, dnName?: string) => Promise<Methods>;

export type Config = {
  uri: string;
  dbName: string;
  resources: Record<string, any>[];
  options: MongoOptions;
}

export type Lib = (config: Config) => Client;
