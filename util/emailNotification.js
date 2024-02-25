const nodemailer = require('nodemailer');
const configurationService = require('./configuration-service')

/**
 * Nodemailer transporter configuration for sending email notifications.
 * @type {Object}
 */
let transporter;

try {
    transporter = nodemailer.createTransport({
        service: configurationService.SERVICE,
        auth: {
            user: configurationService.USER,
            pass: configurationService.PASS,
        },
    });
} catch (error) {
    console.error("Failed to create transporter:", error);
}

/**
 * Function to send email notification for low stock of an ingredient.
 * @param {Object} ingredient - The ingredient object representing the ingredient with low stock.
 * @returns {Promise<void>} - A Promise representing the asynchronous operation.
 */
const sendEmailNotification = async (ingredient) => {
    try {
        if (!transporter) {
            console.error("Transporter is not initialized.");
            return;
        }
        
        await transporter.sendMail({
            from: configurationService.USER,
            to: configurationService.RECEIVER,
            subject: 'Low Stock Notification',
            text: `Ingredient ${ingredient.name} is running low in stock. Please restock soon.`,
        });
    } catch (error) {
        console.error("Failed to send email:", error);
    }
};

module.exports = sendEmailNotification;
