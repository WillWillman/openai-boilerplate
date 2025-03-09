import { status } from './status';

export const health = (libs, _config) => [
    status(libs),
];
