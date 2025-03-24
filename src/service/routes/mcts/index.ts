import { train } from './train';
import { models } from './models';

export const openai = (libs, _config) => [
  train(libs),
];
