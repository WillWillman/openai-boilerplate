import { MongoClientType } from "../interfaces";
import * as express from 'express';

export const removeHandler = (collection: MongoClientType) => async (req: express.Request, res: express.Response) => {
  const response = await collection.removeOne(req.body);
  return res.status(200).json(response);
};
