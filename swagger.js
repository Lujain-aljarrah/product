const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: [
        './routes/ingredient.js',
        './routes/product.js',
        './routes/order.js',
    ],
};

const specs = swaggerJsdoc(options);

module.exports = { specs, swaggerUi };
