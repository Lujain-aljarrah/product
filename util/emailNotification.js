const nodemailer = require('nodemailer');

/**
 * Nodemailer transporter configuration for sending email notifications.
 * @type {Object}
 */
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'productacc.test@gmail.com',
        pass: 'test@2000xy',
    },
});

/**
 * Function to send email notification for low stock of an ingredient.
 * @param {Object} ingredient - The ingredient object representing the ingredient with low stock.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const sendEmailNotification = async (ingredient) => {
    await transporter.sendMail({
        from: 'productacc.test@gmail.com',
        to: 'lujainaljarrah92@gmail.com',
        subject: 'Low Stock Notification',
        text: `Ingredient ${ingredient.name} is running low in stock. Please restock soon.`,
    });
};

module.exports = sendEmailNotification;
