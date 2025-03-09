import { getActions } from './getActions';
import { getReducer } from './getReducer';

export type GetStore = (config) => {
  actions: Record<string, ReturnType<typeof getActions>>;
  reducers: Record<string, ReturnType<typeof getReducer>>;
};

export const getStore: GetStore = (config) =>
  config
    .data
    .resources
    .reduce((acc, { name }) => {
      acc.actions[name] = getActions(name);
      acc.reducers[name] = getReducer(name);
      return acc;
    }, {
      actions: {},
      reducers: {},
    });
