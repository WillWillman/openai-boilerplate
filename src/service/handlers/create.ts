import * as express from 'express';
import { randomUUID } from 'crypto';
import { MongoClientType } from '../interfaces';

export const createHandler = (collection: MongoClientType) => async (req: express.Request, res: express.Response) => {
  const response = await collection.create({
    ...req.body,
    id: randomUUID(),
  });
  return res.status(200).json(response);
};
