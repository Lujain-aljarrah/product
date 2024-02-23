const Order = require('../models/order');
const Product = require('../models/product');
const Ingredient = require('../models/ingredient');
const sendEmailNotification = require('../util/emailNotification');

/**
 * Retrieves all orders.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

/**
 * Creates a new order.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const createOrder = async (req, res) => {
    try {
        const { products } = req.body;
        const orderProducts = [];

        for (let { product, quantity } of products) {
            const productDetails = await Product.findById(product).populate(
                'ingredients.ingredient',
            );
            if (!productDetails) {
                return res
                    .status(400)
                    .json({ message: `Product ${product} not found` });
            }

            for (let {
                ingredient,
                quantity: ingredientQuantity,
            } of productDetails.ingredients) {
                const requiredQuantity = ingredientQuantity * quantity;
                const ingredientDetails = await Ingredient.findById(ingredient);

                if (ingredientDetails.currentStock < requiredQuantity) {
                    return res.status(400).json({
                        message: `Insufficient stock for ingredient ${ingredient}`,
                    });
                }

                ingredientDetails.currentStock -= requiredQuantity;
                if (
                    ingredientDetails.currentStock <
                        0.5 * ingredientDetails.initialStock &&
                    !ingredientDetails.emailNotificationSent
                ) {
                    sendEmailNotification(ingredientDetails);
                    ingredientDetails.emailNotificationSent = true;
                }

                await ingredientDetails.save();
            }

            orderProducts.push({ product, quantity });
        }

        const order = new Order({ products: orderProducts });
        await order.save();

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOrders, createOrder };
