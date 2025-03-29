import { randomUUID } from 'crypto';

export const createNode = ({
  gameId,
  gameState,
  action = null,
  parent = null,
}) => ({
  id: randomUUID(),
  gameId,
  gameState,
  action,
  parent,
  children: [],
  visits: 0,
  value: 0,
});
