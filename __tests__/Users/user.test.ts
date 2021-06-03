import app from '../../src/server';
import request from 'supertest';
import { getRepository } from 'typeorm';
import connection from '../../src/database/index';
import User from '../../src/database/entity/User';

beforeAll(async () => {
  await connection.create();
});

afterAll(async () => {
  await connection.close();
});

// beforeEach(async () => {
//   await connection.clear();
// });

it('creates a user', async () => {
  const repository = getRepository(User);
  const user = await repository.find();
  console.log(user, '---------------------');
  //expect(user.length).toBe(2);
  expect(user[0].name).toBe('Marcelo2');
});

it('creates a user', async () => {
  const getUsers = await request(app).get('/users');
  expect(getUsers.status).toBe(200);
});
