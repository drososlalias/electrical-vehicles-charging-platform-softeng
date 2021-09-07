const request = require('supertest');
const chai    = require('chai')
const expect  = chai.expect;
const {app}   = require('../server');

const stationOwner = {
    "username": "drososlal",
    "password": "drososlal"
}

let token;

// Testing stationOwner login
describe('Testing login route in "stationOwner" mode [ POST /login/:username/:password/:isStationOwner ]', () => {
    it('Should login with status 200', (done) => {
        request(app)
        .post('/evcharge/api/login/' + stationOwner.username + '/' + stationOwner.password + '/true')
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

// Testing stationOwner logout
describe('Testing logout route in "stationOwner" mode [ POST /logout ]', () => {
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