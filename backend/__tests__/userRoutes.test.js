import supertest from 'supertest';
import db from '../models/index.js';
import app from '../server.js';

jest.mock('../models/index.js', () => ({
  user: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));
const requestWithSupertest = supertest(app);

describe('User Creation', () => {
  it('should successfully create a new user', async () => {
    db.user.findOne.mockResolvedValue(null); // simulates email does not exists.
    db.user.create.mockResolvedValue({
      id: 1,
      email: 'test@example.com',
    });

    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'Password123!',
    };

    const response = await requestWithSupertest
      .post('/api/users/create')
      .send(newUser);

    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Guest user created successfully');
    expect(response.body.user).toHaveProperty('id', 1);
  });

  it('should return error if email is already in use', async () => {
    // Mock database call
    db.user.findOne.mockResolvedValue({ id: 1, email: 'test@example.com' }); //simulates given email already exists.

    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'Password123!',
    };

    const response = await requestWithSupertest
      .post('/api/users/create')
      .send(newUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('Email already in use');
  });
});
