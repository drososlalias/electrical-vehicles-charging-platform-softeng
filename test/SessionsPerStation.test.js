const request = require('supertest');
const chai    = require('chai')
const expect  = chai.expect;
const {app}   = require('../server');

const input = {
    "station": "55",
    "datefrom": "20000505",
    "dateto": "20200505"
}

// Testing SessionsPerStation route in json format
let info;
let token;
describe('Testing SessionsPerStation route exporting data in json format [ GET /SessionsPerStation/:station/:datefrom/:dateto?format=json ]', () => {
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
    describe('Then export JSON sessions data for station', () => {
        it('Should export data with status 200', (done) => {
            request(app)
            .get('/evcharge/api/SessionsPerStation/' + input.station + '/' + input.datefrom + '/' + input.dateto + '?format=json')
            .set('x-auth-token', token.token)
            .end((err, res) => {
                info = res.body;
                expect(res.status).to.eq(200);
                done()
            })
        });
        it('Should have all necessary properties', (done) => {
            expect(info).to.have.keys(
                'StationId',
                'Operator',
                'RequestedTimestamp',
                'PeriodFrom',
                'PeriodTo',
                'TotalEnergyDelivered',
                'NumberOfChargingSessions',
                'NumberOfActivePoints',
                'SessionSummaryList');
            done()
        });
        it('TotalEnergyDelivered should be equal with sum(SessionsSummaryList.EnergyDelivered)', (done) => {
            var sum = 0;
            for (var i in info.SessionSummaryList)
                sum += info.SessionSummaryList[i].EnergyDelivered;
            expect(sum).to.eq(info.TotalEnergyDelivered);
            done()
        })
    })
});

// Testing SessionsPerStation route in csv format
describe('Testing SessionsPerStation route exporting data in csv format [ GET /SessionsPerStation/:station/:datefrom/:dateto?format=csv ]', () => {
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
    describe('Then export CSV sessions data for station', () => {
        it('Should export data with status 200', (done) => {
            request(app)
            .get('/evcharge/api/SessionsPerStation/' + input.station + '/' + input.datefrom + '/' + input.dateto + '?format=csv')
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