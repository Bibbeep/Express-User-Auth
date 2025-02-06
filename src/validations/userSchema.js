const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().max(255).required(),
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

module.exports = {
    registerSchema,
    RegisterRequestBody,
    RegisterSuccessResponse201,
    RegisterFailedResponse400,
    RegisterFailedResponse409,
    FailedResponse500,
};
