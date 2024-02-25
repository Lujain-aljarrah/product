const {
    getIngredients,
    createIngredient,
    getIngredient,
    updateIngredient,
    deleteIngredient,
} = require('../controllers/ingredient');
const Ingredient = require('../models/ingredient');

jest.mock('../models/ingredient');

describe('Ingredient Controller', () => {
    describe('getIngredients', () => {
        it('should return all ingredients', async () => {
            const req = {};
            const res = {
                json: jest.fn(),
            };
            const mockIngredients = [
                { name: 'Ingredient 1' },
                { name: 'Ingredient 2' },
            ];
            Ingredient.find.mockResolvedValue(mockIngredients);

            await getIngredients(req, res);

            expect(res.json).toHaveBeenCalledWith(mockIngredients);
        });

        it('should handle errors', async () => {
            const req = {};
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const errorMessage = 'Internal Server Error';
            Ingredient.find.mockRejectedValue(new Error(errorMessage));

            await getIngredients(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('createIngredient', () => {
        it('should create a new ingredient', async () => {
            const req = {
                body: { name: 'New Ingredient', initialStock: 100 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const newIngredient = {
                _id: 'abc123',
                name: 'New Ingredient',
                initialStock: 100,
                currentStock: 100,
            };
            const ingredient = new Ingredient(newIngredient);

            Ingredient.mockImplementation(() => ingredient);

            ingredient.save.mockResolvedValue(newIngredient);

            await createIngredient(req, res);

            expect(ingredient.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith(newIngredient);
        });

    });
    

    describe('getIngredient', () => {
        it('should return a specific ingredient by ID', async () => {
            const req = {
                params: { id: 'abc123' },
            };
            const res = {
                json: jest.fn(),
            };
            const mockIngredient = {
                _id: 'abc123',
                name: 'Ingredient 1',
                initialStock: 100,
                currentStock: 100,
            };
            Ingredient.findById.mockResolvedValue(mockIngredient);

            await getIngredient(req, res);

            expect(Ingredient.findById).toHaveBeenCalledWith('abc123');
            expect(res.json).toHaveBeenCalledWith(mockIngredient);
        });

        it('should handle not found case', async () => {
            const req = {
                params: { id: 'invalidId' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            Ingredient.findById.mockResolvedValue(null);

            await getIngredient(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Ingredient not found',
            });
        });

        it('should handle errors', async () => {
            const req = {
                params: { id: 'abc123' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const errorMessage = 'Internal Server Error';
            Ingredient.findById.mockRejectedValue(new Error(errorMessage));

            await getIngredient(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('updatedIngredient', () => {
        it('should update a specific ingredient by ID', async () => {
            const req = {
                params: { id: 'abc123' },
                body: { name: 'Updated Ingredient', initialStock: 200 },
            };
            const res = {
                json: jest.fn(),
            };
            const updatedIngredient = {
                _id: 'abc123',
                name: 'Updated Ingredient',
                initialStock: 200,
                currentStock: 200,
            };
            Ingredient.findByIdAndUpdate.mockResolvedValue(updatedIngredient);

            await updateIngredient(req, res);

            expect(Ingredient.findByIdAndUpdate).toHaveBeenCalledWith(
                'abc123',
                {
                    name: 'Updated Ingredient',
                    initialStock: 200,
                    currentStock: 200,
                },
                { new: true },
            );
            expect(res.json).toHaveBeenCalledWith(updatedIngredient);
        });

        it('should handle not found case', async () => {
            const req = {
                params: { id: 'invalidId' },
                body: { name: 'Updated Ingredient', initialStock: 200 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            Ingredient.findByIdAndUpdate.mockResolvedValue(null);

            await updateIngredient(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Ingredient not found',
            });
        });

        it('should handle errors', async () => {
            const req = {
                params: { id: 'abc123' },
                body: { name: 'Updated Ingredient', initialStock: 200 },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const errorMessage = 'Internal Server Error';
            Ingredient.findByIdAndUpdate.mockRejectedValue(
                new Error(errorMessage),
            );

            await updateIngredient(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });

    describe('deleteIngredient', () => {
        it('should handle not found case', async () => {
            const req = {
                params: { id: 'invalidId' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            Ingredient.findByIdAndDelete.mockResolvedValue(null);

            await deleteIngredient(req, res);

            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({
                message: 'Ingredient not found',
            });
        });

        it('should handle errors', async () => {
            const req = {
                params: { id: 'abc123' },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            const errorMessage = 'Internal Server Error';
            Ingredient.findByIdAndDelete.mockRejectedValue(
                new Error(errorMessage),
            );

            await deleteIngredient(req, res);

            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: errorMessage });
        });
    });
});
