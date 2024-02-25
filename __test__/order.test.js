const {
    getOrders,
} = require('../controllers/order');
const Order = require('../models/order');

jest.mock('../models/order');

describe('Order Controller', () => {
    describe('getOrders', () => {
        it('should return all orders', async () => {
            const mockOrders = [
                { _id: '1', products: [{ product: '1', quantity: 2 }] },
                { _id: '2', products: [{ product: '2', quantity: 3 }] },
            ];
            Order.find.mockResolvedValue(mockOrders);

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith(mockOrders);
        });

        it('should handle errors', async () => {
            const errorMessage = 'Internal Server Error';
            Order.find.mockRejectedValue(new Error(errorMessage));

            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            await getOrders(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });
    
});
