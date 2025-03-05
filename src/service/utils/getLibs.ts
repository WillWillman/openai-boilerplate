import {
    data,
    logger,
    openAI,
    server,
} from '../libs';
import { Libs, Config } from '../interfaces';

export const getLibs = async (config: Config): Promise<Libs> => ({
    data: {
        collection: await config.data.resources.reduce(async (resources, resource) => ({
            ...await resources,
            [resource]: await data({
                ...config.data,
                collection: resource
            })
        }), Promise.resolve({}))
    },
    logger,
    openAI: openAI(config.openAI),
    server,
});
