import OpenAI from 'openai';
import { chatJSON } from './chatJSON';


export const openAI = (config) => {
  const openAI = new OpenAI(config.options);
  return {
    chatJSON: chatJSON(openAI, config.defaultModel),
  };
};
