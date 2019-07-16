//apiTest.js
const request = require('supertest');
const app = require('../../dist/app'); //reference to you app.js file
let chai = require("chai");
let chaiHttp = require("chai-http");
let should = chai.should();
chai.use(chaiHttp);
//==================== API test ====================

/**
 * Testing get all user endpoint
 */
describe('Test all endpoints', function () {
  //==================== User API test ====================

  /**
   * Testing get all user endpoint
   */
  describe('GET /users', function () {
      it('respond with error 401. Need valid credentials to access user data', function (done) {
          request(app)
              .get('/users')
              .set('Accept', 'application/json')
              .expect('Content-Type', /json/)
              .expect(401, done);
      });
    });
});
