import { combineReducers } from 'redux';
import { applyDispatch } from './utils';
import * as resources from './resources';
import * as openai from './openai';


export const getStore = (config: any) => {
  const resourceStore = resources.getStore(config);
  const openaiStore = openai.getStore(config);

  return {
    reducer: combineReducers({
      resources: combineReducers(resourceStore.reducers),
      openai: openaiStore.reducer,
    }),
    getActions: (dispatch: any) => ({
      actions: applyDispatch(dispatch)({
        resources: resourceStore.actions,
        openai: openaiStore.actions,
      }),
    }),
  };
};
