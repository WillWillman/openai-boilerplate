import OpenAI from 'openai';
import { getClient, getErrorClient } from './clients';
import { Lib } from './interfaces';

export const openAI: Lib = (config) =>
  config.apiKey
    ? getClient(new OpenAI(config))
    : getErrorClient(null);
