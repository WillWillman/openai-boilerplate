import { MongoClient } from 'mongodb';
import { initCollection } from './utils';
import { Lib } from './interfaces';

export const data: Lib = (config) => async (collectionName, schema) => {
  const client = new MongoClient(config.uri, {
    ...config.options,
    forceServerObjectId: false,
  });

  return client.connect()
    .then(async () => {
      const collection = await initCollection(client, config, collectionName);
      const remove_id = ({ _id, ...rest }: any) => rest;

      return {
        schema,
        config,
        close: async () => client
          .close(),

        count: async (query) => collection
          .countDocuments(query),

        create: async (doc) => collection
          .insertOne(remove_id(doc))
          .then(() => doc),

        read: async (id) => collection
          .findOne({ id })
          .then(remove_id),

        list: async (query) => collection
          .find(query)
          .toArray()
          .then(docs => docs.map(remove_id)),

        update: async (doc) => collection
          .replaceOne({ id: doc.id }, remove_id(doc))
          .then(() => doc),

        removeOne: async (doc) => collection
          .deleteOne(doc)
          .then(() => doc),

        upsert: async (doc) => collection
          .replaceOne({ id: doc.id }, remove_id(doc), { upsert: true })
          .then(() => doc),
      };
    });
};
