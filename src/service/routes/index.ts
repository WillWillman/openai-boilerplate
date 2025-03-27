import { resources } from './resources';
import { health } from './health';
import { openai } from './openai';
import { mcts } from './mcts';

export const routes = async (libs, config) => [
  ...await resources(libs, config),
  ...await mcts(libs, config),
  ...health(libs, config),
  ...openai(libs, config),
];
