import { config } from './config';
import { server } from './server';
import { cleanup, getLibs, sideEffect } from './utils';

getLibs(config)
    .then(sideEffect(server(config.port)))
    .then(libs => process.on('exit', () => cleanup(libs)));
