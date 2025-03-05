import { MongoClientType } from "../interfaces";
import * as express from 'express';

export const listHandler = (collection: MongoClientType) => async (req: express.Request, res: express.Response) => {
  const response = await collection.list(req.query);
  return res.status(200).json(response);
};
