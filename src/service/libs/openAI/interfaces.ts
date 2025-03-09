import OpenAI from 'openai';
import { ChatCompletion, ChatCompletionCreateParamsNonStreaming } from 'openai/resources';

export type Config = {
  apiKey: 'string',
  organization: 'string',
}

export type Client = {
  chat: {
    completions: (config: ChatCompletionCreateParamsNonStreaming) => Promise<ChatCompletion>;
  },
  models: {
    list: () => Promise<OpenAI.Models.Model[]>
  };
}

export type Lib = (config: Config) => Client;
