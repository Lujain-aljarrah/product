const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: API endpoints for managing orders
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Retrieve all orders
 *     tags: [Orders]
 *     responses:
 *       '200':
 *         description: A list of orders
 *       '500':
 *         description: Internal server error
 */
router.get('/', orderController.getOrders);

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Create a new order
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     product:
 *                       type: string
 *                     quantity:
 *                       type: number
 *     responses:
 *       '201':
 *         description: Order created successfully
 *       '500':
 *         description: Internal server error
 */
router.post('/', orderController.createOrder);

module.exports = router;
