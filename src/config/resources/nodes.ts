import { array, number, object, string } from './schemaHelpers';

export const body = object({
  properties: {
    id: string,
    gameId: string,
    state: object({}),
    action: string,
    parent: string,
    children: array(string),
    visits: number,
    value: number,
  },
  required: [
    'id',
    'state',
    'action',
    'parent',
    'children',
    'visits',
    'value',
  ]
});

const query = object({
  properties: {
    gameId: string,
    action: string,
    parent: string,
    children: array(string),
    visits: number,
    value: number,
  }
})

export const node = {
  name: 'nodes',
  dbName: 'mcts',
  schema: {
    body,
    query,
  },
};
