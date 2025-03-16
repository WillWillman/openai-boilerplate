import { MongoClient } from 'mongodb';
import { Config } from '../interfaces';

export const initCollection = async (client: MongoClient, config: Config, collectionName: string) => {
  const collection = await client.db(config.db).createCollection(collectionName);

  await collection.createIndex({
    id: 1,
  }, { unique: true, name: 'id' });

  return collection;
};
