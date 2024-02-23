const Product = require('../models/product');
const Ingredient = require('../models/ingredient');

/**
 * Retrieves all products with their associated ingredients.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate(
            'ingredients.ingredient',
        );
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Creates a new product with the specified ingredients.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next function.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const createProduct = async (req, res, next) => {
    try {
        const { name, description, price, ingredients } = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            ingredients: [],
        });

        for (const ingredientInfo of ingredients) {
            const { ingredient, quantity } = ingredientInfo;

            const ingredientData = await Ingredient.findById(ingredient);

            if (!ingredientData) continue;

            newProduct.ingredients.push({
                ingredient: ingredient,
                quantity: quantity,
            });
        }

        const savedProduct = await newProduct.save();

        for (const { ingredient } of ingredients) {
            await Ingredient.findByIdAndUpdate(ingredient, {
                $push: { products: savedProduct._id },
            });
        }

        res.status(201).json({
            message: 'Product created successfully',
            product: savedProduct,
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Retrieves a specific product by ID with its associated ingredients.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate(
            'ingredients.ingredient',
        );
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 * Updates a specific product by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, ingredients } = req.body;
        const updatedIngredients = ingredients.map((ing) => ({
            ingredient: ing.ingredient,
            quantity: ing.quantity,
        }));

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, ingredients: updatedIngredients },
            { new: true },
        ).populate('ingredients.ingredient');

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product updated successfully', product });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
/**
 * Deletes a specific product by ID.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Ingredient.updateMany(
            { _id: { $in: product.ingredients.map((ing) => ing.ingredient) } },
            { $pull: { products: product._id } },
        );

        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProducts,
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct,
};
