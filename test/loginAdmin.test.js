const request = require('supertest');
const chai    = require('chai')
const expect  = chai.expect;
const {app}   = require('../server');

const admin = {
    "username": "admin",
    "password": "admin"
}

let token;

// Testing admin login
describe('Testing login route in "admin" mode [ POST /login/:username/:password/:isStationOwner ]', () => {
    it('Should login with status 200', (done) => {
        request(app)
        .post('/evcharge/api/login/' + admin.username + '/' + admin.password + '/false')
        .end((err, res) => {
            token = res.body
            expect(res.status).to.eq(200);
            done()
        })
    })
    it('Should return token', () => {
        expect(token).to.have.property('token')
    })
});

// Testing admin logout
describe('Testing logout route in "admin" mode [ POST /logout ]', () => {
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