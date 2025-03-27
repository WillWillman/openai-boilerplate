export const trainSchema = {
  body: {
    type: 'object',
    properties: {
      required: ['gameId', 'count', 'explorationConstant', 'maxDepth'],
      gameId: { type: 'string' },
      count: { type: 'number' },
      explorationConstant: { type: 'number' },
      maxDepth: { type: 'number' },
    },
  },
};
