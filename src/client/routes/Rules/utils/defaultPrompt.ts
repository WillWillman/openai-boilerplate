import { config } from 'Client-Config';

export const defaultPrompt = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'developer',
      content: [
        {
          type: 'text',
          text: 'You are an assistant',
        },
        {
          type: 'text',
          text: 'Tasked with generating an AI friendly gameState and trainingParams, use provided json schema, for a MCTS Training program.',
        },
        {
          type: 'text',
          text: JSON.stringify(config.data.resources.gameState.schema),
        },
        {
          type: 'text',
          text: 'Only respond with structured stringified compact JSON. no whitespace, no newlines, nothing other than the json.',
        },
      ],
    },
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Game Name Here',
        },
      ],
    },
  ],
};
