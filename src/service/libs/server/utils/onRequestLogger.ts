import { ILogger } from '../../../libs';

export const onRequestLogger = (logger: ILogger.Client) => (req, _res, next) => {
    logger('Server Request Received')(req);
    next();
};
