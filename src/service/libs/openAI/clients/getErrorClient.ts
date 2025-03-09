import { Client } from '../interfaces';

export const getErrorClient = (_openai): Client => {
  const message = 'OpenAI API Key is required if using OpenAI Features';
  console.error(`\x1b[31m${message}\x1b[0m`);

  return {
    chat: {
      completions: (_) =>
        Promise.reject({
          message,
        }),
    },
    models: {
      list: () =>
        Promise.reject({
          message,
        })
    }
  }
};
