export const trainSchema = {
  body: {
    type: 'object',
    properties: {
      gameId: { type: 'string' },
      count: { type: 'number' },
      explorationConstant: { type: 'number' },
      maxDepth: { type: 'number' },
      test: { type: 'boolean' },
    },
    required: ['gameId', 'count', 'explorationConstant', 'maxDepth', 'test'],
  },
};
