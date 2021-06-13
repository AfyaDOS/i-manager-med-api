import request from 'supertest';
import app from '../../src/server';

// beforeAll(async () => {
//   await connection.create();
// });

// afterAll(async () => {
//   await connection.close();
// });

// beforeEach(async () => {
//   await connection.clear();
// });

it('index user', async () => {
  const getUsers = await request(app).get('/users');
  expect(getUsers.status).toBe(200);
});

it('create user', async () => {
  const setUsers = await request(app)
    .post('/users')
    .send({ name: 'teste', email: 'teste@teste', password: 'teste' });
  expect(setUsers.status).toBe(200);

  const emailConflict = await request(app)
    .post('/users')
    .send({ name: 'teste', email: 'teste@teste', password: 'teste' });
  expect(emailConflict.status).toBe(409);

  await request(app).delete(`/users/${setUsers.body.id}`);
});

it('update user', async () => {
  const setUsers = await request(app)
    .post('/users')
    .send({ name: 'teste', email: '1teste@teste', password: 'teste' });
  expect(setUsers.status).toBe(200);

  const updateUser = await request(app)
    .put(`/users/${setUsers.body.id}`)
    .send({ name: 'Update', email: '1Update@teste', password: 'Update' });
  expect(updateUser.status).toBe(200);

  const emailConflict = await request(app)
    .put(`/users/${setUsers.body.id}`)
    .send({ name: 'Update', email: '1Update@teste', password: 'Update' });
  expect(emailConflict.status).toBe(409);

  await request(app).delete(`/users/${setUsers.body.id}`);
});

it('delete user', async () => {
  const setUsers = await request(app)
    .post('/users')
    .send({ name: 'teste', email: '1teste@teste', password: 'teste' });

  const deleteUser = await request(app).delete(`/users/${setUsers.body.id}`);
  expect(deleteUser.status).toBe(200);
});
