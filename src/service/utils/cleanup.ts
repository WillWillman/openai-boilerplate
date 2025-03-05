import { Libs } from '../interfaces';

export const cleanup = (libs: Libs) => async () => {
    if (libs.data)
        await Promise.all(Object.values(libs.data.collection).map(client => client.close()));
    if (libs.server) await libs.server.close();
};
