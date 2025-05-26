import request from 'supertest';
import app from '../../app/src/services/server';
import * as helper from '../../app/src/helpers/helper';

// Mock helper functions
jest.mock('../../app/src/helpers/helper', () => ({
    getUsers: jest.fn(),
    saveUsers: jest.fn(),
}));

const getUsersMock = helper.getUsers as jest.Mock;
const saveUsersMock = helper.saveUsers as jest.Mock;

describe('User Controllers', () => {
    
    it('should create a new user with mocked response', async () => {
        getUsersMock.mockReturnValue([]); 
        saveUsersMock.mockImplementation(() => {}); 

        const res = await request(app)
            .post('/users')
            .send({ fname: 'Test', lname: 'User' });

        expect(res.statusCode).toBe(201);
        expect(res.body).toHaveProperty('message', 'User Test User created.');
    });

    it('should handle duplicate user creation with mocked response', async () => {
        getUsersMock.mockReturnValue([{ fname: 'Test', lname: 'User' }]); // Simulate an existing user

        const res = await request(app)
            .post('/users')
            .send({ fname: 'Test', lname: 'User' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'User Test User already exists.');
    });

    it('should return 404 for non-existent user on update with mocked response', async () => {
        getUsersMock.mockReturnValue([]); // No users exist

        const res = await request(app)
            .put('/users')
            .send({ fullname: 'Unknown User', newfname: 'NewFirstName', newlname: 'NewLastName' });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'No user found with name Unknown User');
    });

    it('should update an existing user with mocked response', async () => {
        getUsersMock.mockReturnValue([{ fname: 'Test', lname: 'User' }]);
        saveUsersMock.mockImplementation(() => {}); // Simulate successful saving

        const res = await request(app)
            .put('/users')
            .send({ fullname: 'Test User', newfname: 'Updated', newlname: 'User' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Updated: Test User -> Updated User');
    });

    it('should delete an existing user with mocked response', async () => {
        getUsersMock.mockReturnValue([{ fname: 'Test', lname: 'User' }]);
        saveUsersMock.mockImplementation(() => {}); // Simulate successful deletion

        const res = await request(app).delete('/users/Test');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User(s) with first name Test deleted.');
    });

    it('should return 404 when deleting a non-existent user with mocked response', async () => {
        getUsersMock.mockReturnValue([]); // No users exist

        const res = await request(app).delete('/users/Unknown');

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'No user found with first name Unknown.');
    });
});
