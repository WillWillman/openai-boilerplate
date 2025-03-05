import * as express from 'express';

export const healthHandler = (_libs) => async (_req: express.Request, res: express.Response) => {
  const response = { status: 'UP' };
  return res.status(200).json(response);
};
