/* eslint-disable no-undef */
const express = require('express');
const { specs, swaggerUi } = require('./swagger');
const mongoConnect = require('./util/database');
const productRoutes = require('./routes/product');
const ingredientRoutes = require('./routes/ingredient');
const orderRoutes = require('./routes/order');

const startServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.use('/products', productRoutes);
    app.use('/ingredients', ingredientRoutes);
    app.use('/order', orderRoutes);

    await mongoConnect();

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer().catch((err) => {
    console.error('Error starting server:', err);
});
