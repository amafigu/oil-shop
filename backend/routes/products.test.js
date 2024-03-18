import supertest from 'supertest';
import products from '../mockData/products.js';
import db from '../models/index.js';
import app from '../server.js';

const request = supertest(app);

jest.mock('../models/index.js', () => ({
  products: {
    findAll: jest.fn(),
  },
}));

describe('products request should', () => {
  test('should return all products', async () => {
    db.products.findAll.mockResolvedValue(products);
    const response = await request.get('/api/products').send(products);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(products);
  });
});
