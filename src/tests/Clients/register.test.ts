import request from 'supertest';
import { createConnection, getConnection } from 'typeorm';
import app from '../../server';
import { MockClient } from '../../../__mocks__';

jest.useFakeTimers();

describe('Post Endpoints', () => {
  beforeAll(async () => {
    await createConnection();
  });

  afterAll(async () => {
    const connections = getConnection();
    await connections.close();
  });
  it('should create a new Client', async () => {
    const res = await request(app).post('/clients/register').send(MockClient);
    console.log(res.body);
    expect(res.statusCode).toEqual(201);
  });
});
