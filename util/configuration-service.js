const dotenv = require('dotenv');
dotenv.config();

const configurationService = {
    MONGODB_URL: process.env.MONGODB_URL,
    PORT: process.env.PORT,
    SERVICE: process.env.SERVICE,
    USER: process.env.USER,
    PASS: process.env.PASS,
    RECEIVER: process.env.RECEIVER,
};

module.exports = configurationService;
