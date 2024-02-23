const mongoose = require('mongoose');

const mongoConnect = async () => {
    mongoose
        .connect('mongodb://localhost:27017/myapp')
        .then(() => console.log('Connected to MongoDB'))
        .catch((err) => console.error('Error connecting to MongoDB:', err));
};

module.exports = mongoConnect;