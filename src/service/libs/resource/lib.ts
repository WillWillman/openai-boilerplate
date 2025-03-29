import { Lib } from './interfaces';

export const resource: Lib = async (config, data) =>
  Object
    .values(config.resources)
    .reduce(async (resources, { name, schema, dbName }) => ({
      ...await resources,
      [name]: await data(name, schema, dbName),
    }), Promise.resolve({}));
