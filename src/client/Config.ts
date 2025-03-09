import { config as rootConfig } from 'Root-Config';

export const config = {
    data: {
        resources: rootConfig.resources,
    },
    store: {
        devTools: process.env.CLIENT_STORE_DEV_TOOLS === 'true',
    }
};
