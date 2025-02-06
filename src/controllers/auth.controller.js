const AuthModel = require('../models/auth');
const { validateRegister } = require('../utils/validator');

module.exports = {
    register: async (req, res, next) => {
        try {
            const { error, value } = validateRegister(req.body);

            if (error) {
                throw error;
            }

            const userId = await AuthModel.create(value);

            return res.status(201).json({
                success: true,
                statusCode: 201,
                message: 'Successfully registered a new user account.',
                data: {
                    user: {
                        id: userId,
                    },
                },
                errors: null,
            });
        } catch (err) {
            next(err);
        }
    },
    login: async (req, res, next) => {
        try {
            /* Empty */
        } catch (err) {
            next(err);
        }
    },
    logout: async (req, res, next) => {
        try {
            /* Empty */
        } catch (err) {
            next(err);
        }
    },
};
