import request from 'supertest';
import app from '../src/app.js';

// TODO: create a test db that can be use for testing only

describe('API Endpoints', () => {
  it('should fetch resource lineage', async () => {
    const response = await request(app).get('/resources/lineage/3');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('lineage');
    expect(Array.isArray(response.body.lineage)).toBe(true);
    expect(response.body.lineage).toEqual([1, 2]);
  });

  it('should evaluate a calculation', async () => {
    const response = await request(app).get('/calculations/1');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('calculatedValue');
    expect(response.body.calculatedValue).toBe(22.5); // Mocked variable (10) + 5
  });
});
