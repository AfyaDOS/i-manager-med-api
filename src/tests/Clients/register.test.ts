import request from 'supertest';
import app from '../../index';

import {
  MockClient,
} from '../../../__mocks__';

describe('Post Endpoints', () => {
  it('should create a new Client', async () => {
    const res = await request(app)
      .post('/clients/register')
      .send(MockClient);
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('post');
  });
});
