import OpenAI from 'openai';
import { Client } from '../interfaces';

export const getClient = (openAI: OpenAI): Client => ({
  models: {
    list: () =>
      openAI
        .models
        .list()
        .then(({ data }) => data),
  },

  chat: {
    completions: (config) =>
      openAI
        .chat
        .completions
        .create(config),
  },
});
