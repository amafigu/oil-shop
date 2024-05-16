import supertest from 'supertest';
import newUser from '../mockData/newUser.js';
import db from '../models/index.js';
import app from '../server.js';

const request = supertest(app);

jest.mock('../models/index.js', () => ({
  users: {
    findOne: jest.fn(),
    create: jest.fn().mockResolvedValue({
      dataValues: {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Password123!',
      },
    }),
  },
  userRoles: {
    findOne: jest.fn(),
  },
}));

describe('User Creation', () => {
  it('should return error if email is already in use', async () => {
    db.users.findOne.mockResolvedValue({ id: 1, email: newUser.email });
    const response = await request.post('/api/users/create').send(newUser);
    expect(response.status).toBe(422);
    expect(response.body.message).toBe('Email already in use');
  });
  it('should successfully create a new user', async () => {
    db.users.findOne.mockResolvedValue(null);
    db.userRoles.findOne.mockResolvedValue(2);
    const response = await request.post('/api/users/create').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Customer user created successfully');
  });
});
