const properties = {
  name: { type: 'string' },
  id: { type: 'string' },
};

export const resource = {
  name: 'resource',
  schema: {
    body: {
      type: 'object',
      properties,
      required: ['name'],
      additionalProperties: false,
    },
    query: {
      type: 'object',
      properties,
      required: [],
      additionalProperties: false,
    },
  },
};
