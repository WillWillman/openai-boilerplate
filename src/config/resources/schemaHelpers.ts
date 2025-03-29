export const string = { type: 'string' };
export const number = { type: 'number' };
export const boolean = { type: 'boolean' };
export const ref = (path) => ({ $ref: '#/definitions/' + path });
export const array = (items) => ({ type: 'array', items });
export const object = ({
  additionalProperties = false,
  required = [],
  properties = {},
  ...rest
}) => ({
  type: 'object',
  properties,
  additionalProperties,
  required,
  ...rest,
});
