/**
 * Joi validation middleware factory.
 * @param {import('joi').ObjectSchema} schema - Joi schema to validate against
 * @param {'body'|'query'|'params'} target - Part of request to validate
 */
const validate = (schema, target = 'body') => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req[target], {
      abortEarly: false,   // collect ALL errors, not just first
      stripUnknown: true,  // remove unknown keys silently
    });

    if (error) {
      const errors = error.details.map((d) => d.message.replace(/"/g, "'"));
      return res.status(422).json({
        success: false,
        message: 'Validation failed.',
        errors,
      });
    }

    // Replace with sanitized/validated value
    req[target] = value;
    next();
  };
};

module.exports = { validate };
