const request = require('supertest');
const app = require('./server');
const expect = require('chai').expect;

describe('add /users with admin rights', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/users/addUsers')
      .send({name:"kumar", email:"km@gmail.com", password:"kuma@1234", isAdmin: false})
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDkyNzI1YWZhNTUyYWUzZDExMTI1MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjUxNTc0OSwiZXhwIjoxNjgyNjAyMTQ5fQ.vvevpEQSuU9Dja6lgnUJlkxwUW7-5lburdR8-AO8yRg")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.token).to.be.a('string');
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('add /users without token', () => {
  it('responds with a 401 status code', (done) => {
    request(app)
      .post('/users/addUsers')
      .send({name:"kumar", email:"km@gmail.com", password:"kuma@1234", isAdmin: false})
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
});

describe('add /users with non admin rights', () => {
  it('responds with a 401 status code', (done) => {
    request(app)
      .post('/users/addUsers')
      .send({name:"kumar", email:"km@gmail.com", password:"kuma@1234", isAdmin: false})
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDkyNzI1YWZhNTUyYWUzZDExMTI1MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjUxNTc0OSwiZXhwIjoxNjgyNjAyMTQ5fQ.vvevpEQSuU9Dja6lgnUJlkxwUW7-5lburdR8-AO8yRk")
      .expect(401)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(401);
        done();
      });
  });
});


describe('Register /users', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/users/register')
      .send({name:"nomnom", email:"nomnom@gmail.com", password:"nomnom@1234", isAdmin: false})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.token).to.be.a('string');
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('update /users with admin rights', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .put('/users/editUser/64493270dfc039b50bfcc0f2')
      .send({name:"Ehlll", email:"hells@gmail.com", isAdmin: false})
      .set('x-access-token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NDkyNzI1YWZhNTUyYWUzZDExMTI1MCIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4MjUxNTc0OSwiZXhwIjoxNjgyNjAyMTQ5fQ.vvevpEQSuU9Dja6lgnUJlkxwUW7-5lburdR8-AO8yRg")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Logout /users', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/users/logout')
      .send()
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal('User Logged Out Successfully')
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Login /users', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/users/login')
      .send({email:"vibhu@gmail.com", password:"vibhu@1234"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.token).to.be.a('string');
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Create /group', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .post('/groups/create')
      .send({name:"politics", description:"chitchat over national topics"})
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('Delete group by id /group', () => {
  it('responds with a 200 status code', (done) => {
    request(app)
      .delete('/groups/64494ef5de211a477bee1f9a')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body.message).to.equal("Group deleted successfully")
        expect(res.status).to.equal(200);
        done();
      });
  });
});

describe('GET all the groups /', () => {
  it('responds with a message', (done) => {
    request(app)
      .get('/groups/groups')
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        done();
      });
  });
});






