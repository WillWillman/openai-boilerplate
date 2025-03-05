import { MongoClient } from 'mongodb';

type Config = {
    client: MongoClient;
    db: string;
    collection: string;
};

export const initCollection = async (config: Config) => {
    const collection = await config.client.db(config.db).createCollection(config.collection);

    await collection.createIndex({
        id: 1
    }, { unique: true, name: 'id' });

    return collection;
};
