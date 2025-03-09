import { configureStore } from '@reduxjs/toolkit';
import { config } from 'Client-Config';
import { getStore } from './getStore';

const { reducer, getActions } = getStore(config);

export { getActions };
export const Store = configureStore({ ...config.store, reducer });
