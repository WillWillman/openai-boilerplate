import { IOpenAI, IServer } from '../../libs';

export const models = (libs: { openAI: IOpenAI.Client }): IServer.Route => ({
  path: '/api/openai/models',
  method: IServer.Method.GET,

  schema: {},

  handler: async (req, res) => {
    const models = await libs.openAI.models.list();
    return res.status(200).json(models);
  },
});
