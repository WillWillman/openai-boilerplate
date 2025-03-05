import { MongoClientType } from "../interfaces";
import * as express from 'express';

export const updateHandler = (collection: MongoClientType) => async (req: express.Request, res: express.Response) => {
  const response = await collection.update(req.body);
  return res.status(200).json(response);
};
