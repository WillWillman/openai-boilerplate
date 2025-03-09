export enum Actions {
  CHAT_COMPLETION = 'OPENAI_CHAT_COMPLETION',
  MODELS_LIST = 'OPENAI_MODELS_LIST'
}

export type ChatCompletionPayload = {
  model: string;
  messages?: {
    role: string;
    content: {
      type?: string,
      text?: string,
    }[];
  }[];
  prompt?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  logprobs?: number;
  stop?: string | string[];
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
};
