import { randomUUID } from 'crypto';

export const createNode = (gameId, state, action, parent = null) => ({
  id: randomUUID(),
  gameId,
  state,
  action,
  parent,
  children: [],
  visits: 0,
  value: 0
});
