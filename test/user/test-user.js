const chai = require("chai");
const expect = chai.expect;
// import sinon
const sinon = require("sinon");
const userController = require("../../dist/modules/user/userController");

describe("getUser", function() {
  it("should send user lists", function() {
    let req = {}
    let next = {}
    // Have `res` have a send key with a function value coz we use `res.send()` in our func
    let res = {
      // replace empty function with a spy
      send: sinon.spy()
    }

    userController.getUsers(req, res, next);
    // `res.send` called once
    expect(res.send.notCalled).to.be.true;
  });
});
