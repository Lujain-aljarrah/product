// models/order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products: [
        {
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
            },
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Order', orderSchema);
