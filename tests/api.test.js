const request = require('supertest');
const db = require('../src/models/index');
const server = require('../src/server/index');


/**
 * Testing get all users endpoint
 */

describe('GET /users/getusers', () => {

  before( done => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
    .then(() => done())
    .catch((err) => done(err));
  });

  it('respond with json containing a list of all users', done => {
    request(server)
      .get('/users/getusers/')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });
});

/**
 * Testing get one user by ID
 */
describe('GET /users/getusersById/:userId', () => {

  before( done => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
    .then(() => done())
    .catch((err) => done(err));
  });

  it('respond with json containing a single user', done => {
    request(server)
      .get('/users/getusersById/3')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  });

  it('respond with user not found - Status 204', done => {
    request(server)
      .get('/users/getusersById/999')
      .set('Accept', 'application/json')
      .expect(204)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });
});




/**
 * Testing get one user by ID
 */
describe('POST /users/createUsers', () => {

  before( done => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
    .then(() => done())
    .catch((err) => done(err));
  });

  it('respond with status 405 - Invalid input', done => {
    const data = {};
    request(server)
      .post('/users/createUsers')
      .send(data)
      .set('Accept', 'application/json')
      .expect(405)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });

  it('respond with status 405 - Invalid input birthDate', done => {
    const data = {
        id: 999,
        name: "Prueba Prueba",
        email: "test@gmail.com",
        birthDate: "XXXXX",
        address: {
            id: 999,
            street: "Av. Test",
            state: "Test",
            city: "Test",
            country: "Test",
            zip: "-"
        }
    };
    request(server)
      .post('/users/createUsers')
      .send(data)
      .set('Accept', 'application/json')
      .expect(405)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });

  it('respond with status 200 - CREATED', done => {
    let testData = {
        id: 999,
        name: "Prueba Prueba",
        email: "test@gmail.com",
        birthDate: "2020-01-01",
        address: {
            id: 999,
            street: "Av. Test",
            state: "Test",
            city: "Test",
            country: "Test",
            zip: "-"
        }
    };
    request(server)
      .post('/users/createUsers')
      .send(testData)
      .set('Accept', 'application/json')
      .expect(200)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });

});

/**
 * Testing PUT
 */
describe('PUT /users/updateUsersById/:idUser', () => {

  before( done => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
    .then(() => done())
    .catch((err) => done(err));
  });

  it('respond with status 400 - Invalid input', done => {
    const data = {};
    request(server)
      .put('/users/updateUsersById/aaaa')
      .send(data)
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });

  it('respond with status 404 - Invalid user id', done => {
    const data = {
        id: 777,
        name: "Prueba Prueba",
        email: "test@gmail.com",
        birthDate: "2020-01-01",
        address: {
            id: 777,
            street: "Av. Test",
            state: "Test",
            city: "Test",
            country: "Test",
            zip: "-"
        }
    };
    request(server)
      .put('/users/updateUsersById/888')
      .send(data)
      .set('Accept', 'application/json')
      .expect(404)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });
  it('respond with status 200', done => {
    const data = {
        id: 999,
        name: "TEST TEST",
        email: "test@gmail.com",
        birthDate: "2020-01-01",
        address: {
            id: 999,
            street: "Av. Test 2",
            state: "Test",
            city: "Test",
            country: "Test",
            zip: "-"
        }
    };
    request(server)
      .put('/users/updateUsersById/999')
      .send(data)
      .set('Accept', 'application/json')
      .expect(200)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });
});


/**
 * Testing DELETE
 */
describe('DELETE /users/deleteUsersById/:idUser', () => {

  before( done => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
    .then(() => done())
    .catch((err) => done(err));
  });
  it('respond with status 400 - Invalid user id', done => {
    request(server)
      .delete('/users/deleteUsersById/aaaa')
      .set('Accept', 'application/json')
      .expect(400)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });
  it('respond with status 404 - User not found', done => {
    request(server)
      .delete('/users/deleteUsersById/777')
      .set('Accept', 'application/json')
      .expect(404)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });
  it('respond with status 200 - Invalid user id', done => {
    request(server)
      .delete('/users/deleteUsersById/999')
      .set('Accept', 'application/json')
      .expect(200)
      .end(err => {
        if (err) return done(err)
        done();
      });
  });
});
