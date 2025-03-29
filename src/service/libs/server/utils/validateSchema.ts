import Ajv from 'ajv';

export const validateSchema = schema => {
  const ajv = new Ajv({ coerceTypes: true });
  return (req, res, next) => {

    if (!schema) {
      return next();
    }

    const validate = ajv.compile({
      type: 'object',
      properties: {
        ...schema.query && { query: schema.query },
        ...schema.body && { body: schema.body },
      },
      additionalProperties: true,
    });

    validate(req);

    return validate.errors
      ? res.status(400).json(validate.errors)
      : next();
  };
};
