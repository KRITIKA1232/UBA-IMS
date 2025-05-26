import request from 'supertest';
import app from '../../app/src/services/server';

describe('Routes Mapping', () => {
    it('should correctly map /users', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toBe(200);
    });

    it('should correctly map /users/:fname', async () => {
        const res = await request(app).get('/users/Test');
        expect(res.statusCode).not.toBe(500);
    });

    it('should correctly map /users (POST)', async () => {
        const res = await request(app)
            .post('/users')
            .send({ fname: 'Test', lname: 'User' });
        expect(res.statusCode).not.toBe(500);
    });
});
