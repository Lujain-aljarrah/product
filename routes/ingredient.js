const express = require('express');
const router = express.Router();
const ingredientController = require('../controllers/ingredient');

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: API endpoints for managing ingredients
 */

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: API endpoints for managing ingredients
 */

/**
 * @swagger
 * /ingredients:
 *   get:
 *     summary: Retrieve all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       '200':
 *         description: A list of ingredients
 *       '500':
 *         description: Internal server error
 */
router.get('/', ingredientController.getIngredients);

/**
 * @swagger
 * /ingredients:
 *   post:
 *     summary: Create a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               initialStock:
 *                 type: number
 *     responses:
 *       '201':
 *         description: Ingredient created successfully
 *       '500':
 *         description: Internal server error
 */
router.post('/', ingredientController.createIngredient);

/**
 * @swagger
 * /ingredients/{id}:
 *   get:
 *     summary: Retrieve a specific ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ingredient to retrieve
 *     responses:
 *       '200':
 *         description: A single ingredient object
 *       '404':
 *         description: Ingredient not found
 *       '500':
 *         description: Internal server error
 */
router.get('/:id', ingredientController.getIngredient);

/**
 * @swagger
 * /ingredients/{id}:
 *   put:
 *     summary: Update a specific ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ingredient to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               initialStock:
 *                 type: number
 *     responses:
 *       '200':
 *         description: Ingredient updated successfully
 *       '404':
 *         description: Ingredient not found
 *       '500':
 *         description: Internal server error
 */
router.put('/:id', ingredientController.updateIngredient);

/**
 * @swagger
 * /ingredients/{id}:
 *   delete:
 *     summary: Delete a specific ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID of the ingredient to delete
 *     responses:
 *       '200':
 *         description: Ingredient deleted successfully
 *       '404':
 *         description: Ingredient not found
 *       '500':
 *         description: Internal server error
 */
router.delete('/:id', ingredientController.deleteIngredient);
module.exports = router;
