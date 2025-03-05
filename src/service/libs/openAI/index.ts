import OpenAI from 'openai';
import { chatJSON } from './chatJSON';


export const openAI = (config) => {
  if (!config.options.apiKey) {
    const message = 'OpenAI API Key is required if using OpenAI Features';
    console.error(`\x1b[31m${message}\x1b[0m`);
    return {
      chatJSON: (_schema) => (_prompt, _model) =>
        Promise.reject({
          message: message,
        })
    };
  }

  const openAI = new OpenAI(config.options);
  return {
    chatJSON: chatJSON(openAI, config.defaultModel),
  };
};
