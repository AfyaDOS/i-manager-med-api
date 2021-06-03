// import request from 'supertest';
// import { createConnection, createConnections } from 'typeorm';
// import { createTypeormConn } from '../../src/database';
// import app from '../../src/server';
// import { MockClient } from '../../__mocks__';

// jest.useFakeTimers();

// describe('Post Endpoints', () => {
//   beforeAll((done) => {
//     // createConnections().then(() => done()).catch((err) => done(err));

//     createTypeormConn
//       .create()
//       .then(() => done())
//       .catch((err) => done(err.message));
//   });

//   afterAll((done) => {
//     createTypeormConn
//       .clear()
//       .then(() => {
//         createTypeormConn
//           .close()
//           .then(() => done())
//           .catch((err) => done(err.message));
//       })
//       .catch((err) => done(err.message));
//   });

//   it('should create a new Client', (done) => {
//     request(app)
//       .post('/clients/register')
//       .send(MockClient)
//       .then((res) => {
//         expect(res.statusCode).toEqual(201);
//         done();
//       })
//       .catch((res) => {
//         expect(res.statusCode).toEqual(201);
//         done();
//       });
//   });
// });
