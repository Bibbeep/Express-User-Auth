const { registerSchema } = require('../validations/userSchema');

const validator = (schema) => {
    return (payload) => {
        return schema.validate(payload, { abortEarly: false });
    };
};

module.exports = {
    validateRegister: validator(registerSchema),
};
