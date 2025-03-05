import { MongoClientType } from "../interfaces";
import * as express from 'express';

export const readHandler = (collection: MongoClientType) => async (req: express.Request, res: express.Response) => {
  const response = await collection.read(req.params.id);
  if(!response) throw new Error('Not found');
  return res.status(200).json(response);
};
