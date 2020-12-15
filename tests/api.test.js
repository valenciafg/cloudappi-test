const request = require('supertest');
const db = require('../src/models/index');
const server = require('../src/server/index');


/**
 * Testin gett all users endpoint
 */
describe('GET /users/getusers', () => {

  before( done => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  })

  after((done) => {
    db.close()
    .then(() => done())
    .catch((err) => done(err));
  })

  it('respond with json containing a list of all users', done => {
    request(server)
      .get('/users/getusers')
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
        } else {
          done();
        }
      });
  });
});
