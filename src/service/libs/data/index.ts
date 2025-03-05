import { MongoClient } from 'mongodb';
import { MongoClientType } from '../../interfaces';
import { initCollection } from './initCollection';

export const data = async (config): Promise<MongoClientType> => {
  const client = new MongoClient(config.uri, config.options);

  try {
    await client.connect();


    const collection = await initCollection({ client, ...config });

    const remove_id = ({ _id, ...rest }: any) => rest;

    return {
      close: async () => client
        .close(),
      count: async (query) => collection
        .countDocuments(query),
      create: async (doc) => collection
        .insertOne(remove_id(doc))
        .then(() => doc),
      read: async (id) => collection
        .findOne({ id }),
      list: async (query) => collection
        .find(query)
        .toArray(),
      update: async (doc) => collection
        .updateOne({ id: doc.id }, { $set: remove_id(doc) })
        .then(() => doc),
      removeOne: async (doc) => collection
        .deleteOne(doc)
        .then(() => doc),
      upsert: async (doc) => collection
        .updateOne({ id: doc.id }, { $set: doc }, { upsert: true })
        .then(() => doc),
    };
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};
