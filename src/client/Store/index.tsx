import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import { config } from 'Client-Config';
import { getStore } from './getStore';

const { actions, rootReducer } = getStore(config);

export { actions };
export const Store = createStore(rootReducer, applyMiddleware(thunk));
