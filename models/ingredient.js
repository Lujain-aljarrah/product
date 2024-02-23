const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    initialStock: {
        type: Number,
        required: true,
    },
    currentStock: {
        type: Number,
        required: true,
    },
    emailNotificationSent: {
        type: Boolean,
        required: false,
    },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
