const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for managing products
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Retrieve all products
 *     tags: [Products]
 *     responses:
 *       '200':
 *         description: A list of products
 *       '500':
 *         description: Internal server error
 */
router.get('/', productController.getProducts);

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Create a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       '201':
 *         description: Product created successfully
 *       '500':
 *         description: Internal server error
 */
router.post('/', productController.createProduct);

/**
 * @swagger
 * /products/{id}:
 *   get:
 *     summary: Retrieve a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to retrieve
 *     responses:
 *       '200':
 *         description: A single product object
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', productController.getProduct);

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Delete a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to delete
 *     responses:
 *       '200':
 *         description: Product deleted successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', productController.deleteProduct);

/**
 * @swagger
 * /products/{id}:
 *   put:
 *     summary: Update a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the product to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       '200':
 *         description: Product updated successfully
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', productController.updateProduct);

module.exports = router;
