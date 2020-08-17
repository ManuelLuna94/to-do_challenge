const Joi = require("joi");

const schema = Joi.object({
  username: Joi.string().alphanum().min(8).max(30).required(),
  password: Joi.string().alphanum().min(8).max(30).required(),
});

// If validation is successful, return true, otherwise send a 'Bad Request' response
const validate = (data, res) => {
  const { error } = schema.validate(data);

  // Validate data and send 'Bad Request' if something goes wrong in validation
  if (error) return res.status(400).json({ message: error.details });

  return true;
};

module.exports = validate;
