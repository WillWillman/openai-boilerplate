import { resources } from './resources';
import { health } from './health';
import { openai } from './openai';
import { mcts } from './mcts';

export const routes = async (libs, config) => [
  ...mcts(libs, config),
  ...resources(libs, config),
  ...health(libs, config),
  ...openai(libs, config),
];
