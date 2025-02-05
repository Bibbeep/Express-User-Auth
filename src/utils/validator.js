const Joi = require('joi');

const validator = (schema) => {
    return (payload) => {
        return schema.validate(payload, { abortEarly: false });
    };
};

const registerSchema = Joi.object({
    username: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(255).required(),
});

module.exports = {
    validateRegister: validator(registerSchema),
};
