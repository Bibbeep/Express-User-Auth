const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Express User Auth API',
            version: '1.0.0',
            description:
                'A containerized REST API for user authentication using Node.js, Express.js, PostgreSQL, and Docker.',
        },
        servers: [
            {
                url: process.env.BASE_URL || 'http://localhost:3000',
            },
        ],
    },
    apis: ['./src/routes/*.js'],
};

module.exports = swaggerJSDoc(options);
