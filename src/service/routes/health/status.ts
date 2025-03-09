import { IServer } from '../../libs';

export const status = (_libs): IServer.Route => ({
  path: '/api/health/status',
  method: IServer.Method.GET,
  handler: async (_req, res) => {
    const response = { status: 'UP' };
    return res.status(200).json(response);
  }
});
