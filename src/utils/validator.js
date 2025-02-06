const { registerSchema, loginSchema } = require('../validations/userSchema');

const validator = (schema) => {
    return (payload) => {
        return schema.validate(payload, { abortEarly: false });
    };
};

module.exports = {
    validateRegister: validator(registerSchema),
    validateLogin: validator(loginSchema),
};
