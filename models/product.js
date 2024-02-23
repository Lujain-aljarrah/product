const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    ingredients: [
        {
            ingredient: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredient',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model('Product', productSchema);
