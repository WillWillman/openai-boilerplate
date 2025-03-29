import { object, string } from './schemaHelpers';

export const resource = {
  name: 'resource',
  dbName: 'defaultResources',
  schema: {
    body: object({
      properties: {
        name: string,
        id: string,
      },
      required: ['name'],
    }),
    query: object({
      properties: {
        name: string,
      },
    }),
  },
};
