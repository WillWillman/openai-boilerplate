import { Props } from '../interfaces';

export const initData = (props: Props) => () => {
  Object
    .values(props.actions.resources)
    .forEach((resource) => resource.list({}));

  props
    .actions
    .openai
    .modelsList();

  props
    .actions
    .openai
    .chatCompletion(MockChatCompletion);
};

const MockChatCompletion = {
  model: 'gpt-3.5-turbo',
  messages: [
    {
      role: 'developer',
      content: [
        {
          type: 'text',
          text: `You are an assistant: just used to ping`,
        }
      ],
    },
    {
      role: 'developer',
      content: [
        {
          type: 'text',
          text: `Prompt Schema: { "prompt": { "type": "string" } }`,
        }
      ],
    },
    {
      role: 'developer',
      content: [
        {
          type: 'text',
          text: `Response Schema: Prompt Schema: { "prompt": { "type": "string" }, "response": { "type": "string" } }`,
        }
      ],
    },
    {
      role: 'developer',
      content: [
        {
          type: 'text',
          text: 'Only respond with structured stringified compact JSON. no whitespace, no newlines, nothing other than the json.',
        }
      ],
    },
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'ping!',
        }
      ],
    },
  ],
};