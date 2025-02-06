const swaggerJSDoc = require('swagger-jsdoc');
const { version, description } = require('../../package.json');
const {
    RegisterRequestBody,
    RegisterSuccessResponse201,
    RegisterFailedResponse400,
    RegisterFailedResponse409,
    FailedResponse500,
} = require('../validations/userSchema');

const options = {
    definition: {
        openapi: '3.1.0',
        info: {
            title: 'Express User Auth API',
            version,
            description,
        },
        components: {
            securitySchemas: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                RegisterRequestBody,
                RegisterSuccessResponse201,
                RegisterFailedResponse400,
                RegisterFailedResponse409,
                FailedResponse500,
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJSDoc(options);
