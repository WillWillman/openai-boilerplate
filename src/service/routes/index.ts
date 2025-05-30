import { resources } from './resources';
import { health } from './health';
import { openai } from './openai';

export const routes = async (libs, config) => [
  ...resources(libs, config),
  ...health(libs, config),
  ...openai(libs, config),
];
