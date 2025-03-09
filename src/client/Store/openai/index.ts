import { getActions } from './getActions';
import { getReducer } from './getReducer';

export type GetStore = (config) => {
  actions: Record<string, ReturnType<typeof getActions>>;
  reducers: Record<string, ReturnType<typeof getReducer>>;
};

export const getStore = (_config) => ({
  actions: getActions(),
  reducer: getReducer(),
});
