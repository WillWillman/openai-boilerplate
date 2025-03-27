import { resources } from './resources';
import { safeParse } from './safeParse';

const {
  CLIENT_STORE_DEV_TOOLS = false,
  CLIENT_REACT_ROUTER = {},
  RESOURCES = resources,
} = process.env;

// IMPORTANT!! Do not add sensitive info, this file is built using webpack into the bundle
export const config = {
  reactRouter: safeParse(CLIENT_REACT_ROUTER),
  data: {
    resources: safeParse(RESOURCES),
  },
  store: {
    devTools: safeParse(CLIENT_STORE_DEV_TOOLS),
  },
};
