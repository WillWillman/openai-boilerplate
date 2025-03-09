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
        ...schema.payload && { payload: schema.payload },
      },
    });

    validate({
      payload: req.body,
      query: req.query,
    });

    return validate.errors
      ? res.status(400).json(validate.errors)
      : next();
  }
};
