import { create, read, remove, list, update, save } from './actions';

export const getActions = (resource: string) => ({
  create: create(resource),
  read: read(resource),
  remove: remove(resource),
  list: list(resource),
  update: update(resource),
  save: save(resource),
});

export * from './actions';
export { createActionTypes } from './types';
