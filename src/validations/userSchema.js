const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().max(255).required(),
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(255).required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(255).required(),
});

// Swagger Documentation Schemas
const RegisterRequestBody = {
    type: 'object',
    properties: {
        username: {
            type: 'string',
        },
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            format: 'password',
        },
    },
    example: {
        username: 'dummyuser123',
        email: 'test@mail.com',
        password: 'weakpassword321',
    },
};

const RegisterSuccessResponse201 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            properties: {
                user: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                        },
                    },
                },
            },
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            nullable: true,
        },
    },
    example: {
        success: true,
        statusCode: 201,
        data: {
            user: {
                id: 1,
            },
        },
        message: 'Successfully registered a new user account.',
        errors: null,
    },
};

const RegisterFailedResponse400 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            nullable: true,
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    context: {
                        type: 'object',
                        properties: {
                            key: {
                                type: 'string',
                            },
                            value: {
                                type: ['string', 'integer', 'object'],
                                nullable: true,
                            },
                        },
                    },
                },
            },
        },
    },
    example: {
        success: false,
        statusCode: 400,
        data: null,
        message: 'Request body validation error.',
        errors: [
            {
                message: '"username" must be a string',
                context: {
                    key: 'username',
                    value: 123,
                },
            },
            {
                message: '"email" must be a valid email',
                context: {
                    key: 'email',
                    value: 'testmailcom',
                },
            },
            {
                message: '"password" is required',
                context: {
                    key: 'password',
                },
            },
        ],
    },
};

const RegisterFailedResponse409 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            nullable: true,
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    context: {
                        type: 'object',
                        properties: {
                            key: {
                                type: 'string',
                            },
                            value: {
                                type: ['string', 'integer', 'object'],
                                nullable: true,
                            },
                        },
                    },
                },
            },
        },
    },
    example: {
        success: false,
        statusCode: 409,
        data: null,
        message:
            'The email address is already in use. Please use a different email address or log in.',
        errors: [
            {
                message: '"email" is already registered',
                context: {
                    key: 'email',
                    value: 'johndoe@mail.com',
                },
            },
        ],
    },
};

const FailedResponse429 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            nullable: true,
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'object',
            nullable: true,
        },
    },
    example: {
        success: false,
        statusCode: 429,
        data: null,
        message: 'Too many requests, please try again later.',
        errors: null,
    },
};

const FailedResponse500 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            nullable: true,
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    context: {
                        type: 'object',
                        properties: {
                            key: {
                                type: 'string',
                            },
                            value: {
                                type: ['string', 'integer', 'object'],
                                nullable: true,
                            },
                        },
                    },
                },
            },
        },
    },
    example: {
        success: false,
        statusCode: 500,
        data: null,
        message: 'There is an issue with the server.',
        errors: null,
    },
};

const LoginRequestBody = {
    type: 'object',
    properties: {
        email: {
            type: 'string',
            format: 'email',
        },
        password: {
            type: 'string',
            format: 'password',
        },
    },
    example: {
        email: 'test@mail.com',
        password: 'weakpassword321',
    },
};

const LoginSuccessResponse200 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            properties: {
                accessToken: {
                    type: 'string',
                },
            },
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            nullable: true,
        },
    },
    example: {
        success: true,
        statusCode: 200,
        data: {
            accessToken:
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJBbGV4YSIsImlhdCI6MTczODg0NTcxMiwiZXhwIjoxNzM5NDUwNTEyfQ.jaOEpQcfyzZs7sDWz6cG7k3oShiFQkj0wkhEabaScOA',
        },
        message: 'Successfully logged in.',
        errors: null,
    },
};

const LoginFailedResponse400 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            nullable: true,
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    context: {
                        type: 'object',
                        properties: {
                            key: {
                                type: 'string',
                            },
                            value: {
                                type: ['string', 'integer', 'object'],
                                nullable: true,
                            },
                        },
                    },
                },
            },
        },
    },
    example: {
        success: false,
        statusCode: 400,
        data: null,
        message: 'Request body validation error.',
        errors: [
            {
                message: '"email" must be a valid email',
                context: {
                    key: 'email',
                    value: 'alexamail.com',
                },
            },
            {
                message: '"password" is required',
                context: {
                    key: 'password',
                    value: null,
                },
            },
        ],
    },
};

const LoginFailedResponse401 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            nullable: true,
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    context: {
                        type: 'object',
                        properties: {
                            key: {
                                type: 'string',
                            },
                            value: {
                                type: ['string', 'integer', 'object'],
                                nullable: true,
                            },
                        },
                    },
                },
            },
        },
    },
    example: {
        success: false,
        statusCode: 401,
        data: null,
        message: 'Wrong email or password.',
        errors: [
            {
                message: 'Incorrect email',
                context: {
                    key: 'email',
                    value: 'johndoe@mail.com',
                },
            },
            {
                message: 'Incorrect password',
                context: {
                    key: 'password',
                    value: '***********',
                },
            },
        ],
    },
};

const LogoutSuccessResponse200 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            nullable: true,
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            nullable: true,
        },
    },
    example: {
        success: true,
        statusCode: 200,
        data: null,
        message: 'Successfully logged out.',
        errors: null,
    },
};

const LogoutFailedResponse401 = {
    type: 'object',
    properties: {
        success: {
            type: 'boolean',
        },
        statusCode: {
            type: 'integer',
        },
        data: {
            type: 'object',
            nullable: true,
        },
        message: {
            type: 'string',
        },
        errors: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    message: {
                        type: 'string',
                    },
                    context: {
                        type: 'object',
                        properties: {
                            key: {
                                type: 'string',
                            },
                            value: {
                                type: ['string', 'integer', 'object'],
                                nullable: true,
                            },
                        },
                    },
                },
            },
        },
    },
    example: {
        success: false,
        statusCode: 401,
        data: null,
        message: 'Invalid or expired token.',
        errors: [
            {
                message: 'Invalid or expired token',
                context: {
                    key: 'request.headers.authorization',
                    value: null,
                },
            },
        ],
    },
};

module.exports = {
    registerSchema,
    loginSchema,
    RegisterRequestBody,
    RegisterSuccessResponse201,
    RegisterFailedResponse400,
    RegisterFailedResponse409,
    FailedResponse429,
    FailedResponse500,
    LoginRequestBody,
    LoginSuccessResponse200,
    LoginFailedResponse400,
    LoginFailedResponse401,
    LogoutSuccessResponse200,
    LogoutFailedResponse401,
};
