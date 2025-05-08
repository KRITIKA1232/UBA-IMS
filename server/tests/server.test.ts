import request from 'supertest';
import app from '../server'; 
import { getUsers, saveUsers } from '../helpers/helper';

describe('CRUD API', () => {
  it('should fetch all users /', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });

  it('should create a new user /create', async () => {
    const res = await request(app)
      .post('/users')
      .send({ fname: 'Kriteeka', lname: 'Shrestha' });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'User Kriteeka Shrestha created.');
  });

    it('should update an existing user /update', async () => {
        const res = await request(app)
        .put('/users')
        .send({ fullname: 'Kriteeka Shrestha', newfname: 'Server', newlname: 'Shrestha' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'Updated: Kriteeka Shrestha -> Server Shrestha');
    });

    it('should delete a user /delete', async () => {
        const res = await request(app).delete('/users/Server');
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message', 'User(s) with first name Server deleted.');
    }
    );
});

//unit test for getUsers and saveUsers functions 
describe('Helper Functions', () => {
  it('should read users from JSON file', () => {
    const users = getUsers();
    expect(users).toBeInstanceOf(Array);
  });

  it('should save users to JSON file', () => {
    const users = [{ fname: 'Test', lname: 'User' }];
    saveUsers(users);
    const savedUsers = getUsers();
    expect(savedUsers).toEqual(users);
  });
});



