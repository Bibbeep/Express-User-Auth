const AuthModel = require('../models/auth');
const { validateRegister, validateLogin } = require('../utils/validator');

module.exports = {
    register: async (req, res, next) => {
        try {
            console.log(req.method);
            console.log(req.baseUrl);
            console.log(req.path);
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
            console.log(req.method);
            console.log(req.baseUrl);
            console.log(req.path);
            const { error, value } = validateLogin(req.body);

            if (error) {
                throw error;
            }

            const accessToken = await AuthModel.login(value);

            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: {
                    accessToken,
                },
                message: 'Successfully logged in.',
                errors: null,
            });
        } catch (err) {
            next(err);
        }
    },
    logout: async (req, res, next) => {
        try {
            console.log(req.method);
            console.log(req.baseUrl);
            console.log(req.path);
            await AuthModel.logout(req);

            return res.status(200).json({
                success: true,
                statusCode: 200,
                data: null,
                message: 'Successfully logged out.',
                errors: null,
            });
        } catch (err) {
            next(err);
        }
    },
};
