const string = { type: 'string' };
const integer = { type: 'integer' };
const array = (items) => ({ type: 'array', items });
const object = ({
  additionalProperties = false,
  required = [],
  ...properties
}) => ({
  type: 'object',
  properties,
  additionalProperties,
  required,
});

const analysis = {
  what: string,
  why: string,
  how: string,
  gameState: string,
  weight: integer,
};

const responseSchema = {
  game: string,
  state: array(object({
    title: string,
    what: string,
  })),
  gameplay: array(object({
    stage: string,
    objectives: array(object(analysis)),
    choices: array(object({
      what: string,
      why: string,
      how: string,
      gameState: string,
    })),
  })),
  winning: array(object(analysis)),
};

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
          text: 'Tasked with generating an AI friendly ruleset based on provided JSON schema.',
        },
        {
          type: 'text',
          text: JSON.stringify(responseSchema),
        },
        {
          type: 'text',
          text: 'Only respond with structured stringified compact JSON. no whitespace, no newlines, nothing other than the json.',
        },
        {
          type: 'text',
          text: 'This will be saved into a DB and will be used in order to add an AI player to board games. Player will select a choice, provide game state, and the AI will respond with a choice. Player will then provide feedback on the AI choice which will be stored in the db for future training.',
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
