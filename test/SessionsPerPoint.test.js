const request = require('supertest');
const chai    = require('chai')
const expect  = chai.expect;
const {app}   = require('../server');

const input = {
    "point": "210",
    "datefrom": "20000505",
    "dateto": "20200505"
}

// Testing SessionsPerPoint route in json format
let info;
let token;
describe('Testing SessionsPerPoint route exporting data in json format [ GET /SessionsPerPoint/:point/:datefrom/:dateto?format=json ]', () => {
    describe('First login as user', () => {
        it('Should login with status 200', (done) => {
            request(app)
            .post('/evcharge/api/login/drososlal/drososlal/false')
            .end((err, res) => {
                token = res.body;
                expect(res.status).to.eq(200);
                done()
            })
        })
    });
    describe('Then export JSON sessions data for point', () => {
        it('Should export data with status 200', (done) => {
            request(app)
            .get('/evcharge/api/SessionsPerPoint/' + input.point + '/' + input.datefrom + '/' + input.dateto + '?format=json')
            .set('x-auth-token', token.token)
            .end((err, res) => {
                info = res.body;
                expect(res.status).to.eq(200);
                done()
            })
        });
        it('Should have all necessary properties', (done) => {
            expect(info).to.have.keys(
                'pointId',
                'pointOperator',
                'RequestedTimestamp',
                'PeriodFrom',
                'PeriodTo',
                'NumberOfChargingSessions',
                'ChargingSessionList');
            done()
        });
        it('NumberOfChargingSessions should be equal with length(ChargingSessionList)', (done) => {
            expect(info.ChargingSessionList.length).to.eq(info.NumberOfChargingSessions);
            done()
        })
    })
});

// Testing SessionsPerPoint route in csv format
describe('Testing SessionsPerPoint route exporting data in csv format [ GET /SessionsPerPoint/:point/:datefrom/:dateto?format=csv ]', () => {
    describe('First login as user', () => {
        it('Should login with status 200', (done) => {
            request(app)
            .post('/evcharge/api/login/drososlal/drososlal/false')
            .end((err, res) => {
                token = res.body;
                expect(res.status).to.eq(200);
                done()
            })
        })
    });
    describe('Then export CSV sessions data for point', () => {
        it('Should export data with status 200', (done) => {
            request(app)
            .get('/evcharge/api/SessionsPerPoint/' + input.point + '/' + input.datefrom + '/' + input.dateto + '?format=csv')
            .set('x-auth-token', token.token)
            .end((err, res) => {
                info = res.text;
                expect(res.status).to.eq(200);
                done()
            })
        });
        it('Data should be in CSV format', (done) => {
            expect(info).to.be.a("string")
            done()
        });
    })
});