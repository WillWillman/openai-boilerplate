import { IOpenAI, IServer } from '../../libs';

export const chat = (libs: { openAI: IOpenAI.Client }): IServer.Route => ({
  path: '/api/openai/chat/completions',
  method: IServer.Method.POST,

  schema,

  handler: async (req, res, next) => {
    const response = await libs.openAI.chat.completions(req.body);

    res.status(200).json(response);
    next();
  },

});

const schema = {
  body: {
    type: 'object',
    properties: {
      model: { type: 'string' },
      prompt: { type: 'string' },
      messages: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            role: { type: 'string' },
            content: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: { type: 'string' },
                  text: { type: 'string' },
                },
                additionalProperties: false,
              },
            },
          },
          required: ['role', 'content'],
          additionalProperties: false,
        },
      },
      max_tokens: { type: 'integer' },
      temperature: { type: 'number' },
      top_p: { type: 'number' },
      n: { type: 'integer' },
      logprobs: { type: 'integer' },
      stop: {
        oneOf: [
          { type: 'string' },
          { type: 'array', items: { type: 'string' } },
        ],
      },
      presence_penalty: { type: 'number' },
      frequency_penalty: { type: 'number' },
      best_of: { type: 'integer' },
    },
    anyOf: [{ required: ['model', 'prompt'] }, { required: ['model', 'messages'] }],
    additionalProperties: false,
  },
};
