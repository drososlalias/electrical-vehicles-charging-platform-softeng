const request = require('supertest');
const chai    = require('chai')
const expect  = chai.expect;
const {app}   = require('../server');
const multer  = require('multer');
const upload  = multer({dest: 'routes/evcharge/api/sessionUploads'});
const fs      = require('fs')

const admin = {
    "username": "admin",
    "password": "admin"
}

let token;
let user_status;

describe('Testing admin functionalities', () => {
    describe('First login as admin [ POST /login/:username/:password/:isStationOwner ]', () => {
        it('Should login with status 200', (done) => {
            request(app)
            .post('/evcharge/api/login/' + admin.username + '/' + admin.password + '/false')
            .end((err, res) => {
                token = res.body
                expect(res.status).to.eq(200);
                done()
            })
        })
        it('Should return token', (done) => {
            expect(token).to.have.property('token');
            done()
        })
    });
    describe('Check usermod: add user/update password [ POST /admin/usermod/:username/:password/:isStationOwner ]', () => {
        it('Should hit endpoint with status 200', (done) => {
            request(app)
            .post('/evcharge/api/admin/usermod/' + "newUser" + '/' + "newPassword" + '/false')
            .set('x-auth-token', token.token)
            .end((err, res) => {
                expect(res.body.msg).to.be.a("string");
                done()
            })
        })
    });
    describe('Check users: check user status [ GET /admin/users/:username/:isStationOwner ]', () => {
        it('Should hit endpoint with status 200', (done) => {
            request(app)
            .get('/evcharge/api/admin/users/' + "newUser" + '/false')
            .set('x-auth-token', token.token)
            .end((err, res) => {
                user_status = res.body
                expect(res.status).to.eq(200);
                done()
            })
        })
        it('Should have all necessary properties', (done) => {
            expect(user_status).to.have.keys(
                'vehicles',
                '_id',
                'username',
                'password',
                'date',
                '__v');
            done()
        });
    });
    describe('Insert a dummy session [ POST /admin/sessionupd ]', () => {
        it('Should hit endpoint with status 200', (done) => {
            request(app)
            .post('/evcharge/api/admin/sessionupd')
            .attach('file', fs.readFileSync('test/test_session.csv'), 'test_session.csv')
            .set('x-auth-token', token.token)
            .end((err, res) => {
                expect(res.body.msg).to.eq("OK");
                done()
            })
        })
    });
    describe('Reset sessions [ POST /admin/resetsessions ]', () => {
        it('Should hit endpoint with status 200', (done) => {
            request(app)
            .post('/evcharge/api/admin/resetsessions')
            .set('x-auth-token', token.token)
            .end((err, res) => {
                expect(res.status).to.eq(200);
                done()
            })
        })
    });
});
