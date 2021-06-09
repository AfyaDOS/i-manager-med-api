import request from 'supertest';
// import connection from '../../src/database';
import app from '../../src/server';
import { MockClient } from '../../__mocks__';

describe('Test Create new Client', () => {
  // beforeAll(async () => {
  //   await connection.create();
  // });

  // afterAll(async () => {
  //   await connection.close();
  // });

  it('should create a new Client', async () => {
    const res = await request(app)
      .post('/clients/register')
      .send(MockClient);

    expect(res.statusCode).toEqual(201);
  });
});
