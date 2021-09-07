const request = require('supertest');
const chai    = require('chai')
const expect  = chai.expect;
const {app}   = require('../server');

const user = {
    "username": "drososlal",
    "password": "drososlal"
}

// Testing user login
let token;
describe('Testing login route in "user" mode [ POST /login/:username/:password/:isStationOwner ]', () => {
    it('Should login with status 200', (done) => {
        request(app)
        .post('/evcharge/api/login/' + user.username + '/' + user.password + '/false')
        .end((err, res) => {
            token = res.body;
            expect(res.status).to.eq(200);
            done()
        })
    })
    it('Should return token', () => {
        expect(token).to.have.property('token')
    })
});

// Testing user logout
let logoutMessage;
describe('Testing logout route in "user" mode [ POST /logout ]', () => {
    it('Should logout with status 200', (done) => {
        request(app)
        .post('/evcharge/api/logout/')
        .set('x-auth-token', token.token)
        .end((err, res) => {
            logoutMessage = res.body.msg
            expect(res.status).to.eq(200);
            done()
        })
    })
    it('Should return message: \"Token deleted. Successfully Logged out\"', () => {
        expect(logoutMessage).to.eq("Token deleted. Successfully Logged out")
    })
});

// Testing logging with unregistered credentials
let failMessage;
describe('Testing logging with unregistered credentials [ POST /login/:username/:password/:isStationOwner ]', () => {
    it('Should fail with status 400', (done) => {
        request(app)
        .post('/evcharge/api/login/' + "nonRegisteredUsername" + '/' + "RandomPassword" + '/false')
        .end((err, res) => {
            failMessage = res.body.error[0].msg;
            expect(res.status).to.eq(400);
            done()
        })
    })
    it('Should return message: \"Invalid Credentials\"', () => {
        expect(failMessage).to.eq('Invalid Credentials')
    })
});