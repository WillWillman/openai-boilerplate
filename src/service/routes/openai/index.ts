import { chat } from './chat';
import { models } from './models';

export const openai = (libs, _config) => [
    chat(libs),
    models(libs),
];
