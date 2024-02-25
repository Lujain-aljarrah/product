const Ingredient = require('../models/ingredient');
const Product = require('../models/product');

/**
 * Retrieves all ingredients.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const getIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.find();
        res.json(ingredients);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Creates a new ingredient.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const createIngredient = async (req, res, next) => {
    try {
        const { name, initialStock } = req.body;
        const newIngredient = new Ingredient({
            name,
            initialStock,
            currentStock: initialStock,
        });
        const savedIngredient = await newIngredient.save();
        res.status(201).json(savedIngredient);
    } catch (error) {
        next(error);
    }
};
/**
 * Retrieves a specific ingredient by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const getIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }
        res.json(ingredient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/**
 * Updates a specific ingredient by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const updateIngredient = async (req, res) => {
    try {
        const { name, initialStock } = req.body;
        const updatedIngredient = await Ingredient.findByIdAndUpdate(
            req.params.id,
            { name, initialStock, currentStock: initialStock },
            { new: true },
        );

        if (!updatedIngredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        res.json(updatedIngredient);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Deletes a specific ingredient by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const deleteIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
        if (!ingredient) {
            return res.status(404).json({ message: 'Ingredient not found' });
        }

        await Product.updateMany(
            { 'ingredients.ingredient': ingredient._id },
            { $pull: { ingredients: { ingredient: ingredient._id } } },
        );

        res.json({ message: 'Ingredient deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
module.exports = {
    getIngredients,
    createIngredient,
    getIngredient,
    updateIngredient,
    deleteIngredient,
};
