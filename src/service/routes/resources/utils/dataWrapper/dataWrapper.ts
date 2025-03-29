import { Lib } from './interfaces';

export const dataWrapper: Lib = async (config, data) =>
  Object
    .values(config.resources)
    .reduce(async (resources, { name, schema }) => ({
      ...await resources,
      [name]: await data(name, schema),
    }), Promise.resolve({}));
