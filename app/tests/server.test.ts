// import request from 'supertest';
// import app from '../../app/src/services/server';

// describe('Server API Integration Tests', () => {
//     it('should fetch all users successfully', async () => {
//         const res = await request(app).get('/users');
//         expect(res.statusCode).toBe(200);
//         expect(Array.isArray(res.body)).toBeTruthy();
//     });

//     it('should return 404 for a non-existent user', async () => {
//         const res = await request(app).get('/users/Unknown');
//         expect(res.statusCode).toBe(404);
//         expect(res.body).toHaveProperty('message', 'User Unknown not found.');
//     });


//     it('should return 400 for duplicate user creation', async () => {
//         const res = await request(app)
//             .post('/users')
//             .send({ fname: 'Test', lname: 'User' });

//         expect(res.statusCode).toBe(400);
//         expect(res.body).toHaveProperty('message', 'User Test User already exists.');
//     });


//     it('should update an existing user successfully', async () => {
//         const res = await request(app)
//             .put('/users')
//             .send({ fullname: 'Test User', newfname: 'Updated', newlname: 'User' });

//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('message', 'Updated: Test User -> Updated User');
//     });

//     it('should return 404 when updating a non-existent user', async () => {
//         const res = await request(app)
//             .put('/users')
//             .send({ fullname: 'Unknown User', newfname: 'NewFirstName', newlname: 'NewLastName' });

//         expect(res.statusCode).toBe(404);
//         expect(res.body).toHaveProperty('message', 'No user found with name Unknown User');
//     });

//     it('should delete an existing user successfully', async () => {
//         const res = await request(app).delete('/users/Updated');
//         expect(res.statusCode).toBe(200);
//         expect(res.body).toHaveProperty('message', 'User(s) with first name Updated deleted.');
//     });

//     it('should return 404 when deleting a non-existent user', async () => {
//         const res = await request(app).delete('/users/Unknown');
//         expect(res.statusCode).toBe(404);
//         expect(res.body).toHaveProperty('message', 'No user found with first name Unknown.');
//     });
// });




import request from 'supertest';
import app from '../../app/src/services/server';

beforeEach(async () => {
    // Reset database or mock user storage before each test
    await request(app).delete('/users/Test');  // Remove potential duplicate user
});

describe('Server API Integration Tests', () => {
    it('should fetch all users successfully', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should return 404 for a non-existent user', async () => {
        const res = await request(app).get('/users/Unknown');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'User Unknown not found.');
    });

    it('should return 400 for duplicate user creation', async () => {
        // Create a user first
        await request(app).post('/users').send({ fname: 'Test', lname: 'User' });

        // Try to create the same user again (should fail)
        const res = await request(app).post('/users').send({ fname: 'Test', lname: 'User' });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('message', 'User Test User already exists.');
    });

    it('should update an existing user successfully', async () => {
        await request(app).post('/users').send({ fname: 'Test', lname: 'User' });
        const res = await request(app)
            .put('/users')
            .send({ fullname: 'Test User', newfname: 'Updated', newlname: 'User' });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Updated: Test User -> Updated User');
    });

    it('should return 404 when updating a non-existent user', async () => {
        const res = await request(app)
            .put('/users')
            .send({ fullname: 'Unknown User', newfname: 'NewFirstName', newlname: 'NewLastName' });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'No user found with name Unknown User');
    });

    it('should delete an existing user successfully', async () => {
        await request(app).post('/users').send({ fname: 'Test', lname: 'User' });
        const res = await request(app).delete('/users/Test');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User(s) with first name Test deleted.');
    });

    it('should return 404 when deleting a non-existent user', async () => {
        const res = await request(app).delete('/users/Unknown');
        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('message', 'No user found with first name Unknown.');
    });
});
