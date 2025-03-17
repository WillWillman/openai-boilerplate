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

const properties = {
  game: string,
  rulesText: string,
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
  feedback: array(object(analysis)),
};

export const rules = {
  name: 'rules',
  schema: {
    body: object({
      ...properties,
      required: Object.keys(properties),
    }),
    query: object({
      game: string,
    }),
  },
};
