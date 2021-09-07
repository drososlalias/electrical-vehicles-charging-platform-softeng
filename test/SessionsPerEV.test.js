const request = require('supertest');
const chai    = require('chai')
const expect  = chai.expect;
const {app}   = require('../server');

const input = {
    "ev": "CMR-2984",
    "datefrom": "20000505",
    "dateto": "20200505"
}

// Testing SessionsPerEV route in json format
let info;
let token;
describe('Testing SessionsPerEV route exporting data in json format [ GET /SessionsPerEV/:ev/:datefrom/:dateto?format=json ]', () => {
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
    describe('Then export JSON sessions data for ev', () => {
        it('Should export data with status 200', (done) => {
            request(app)
            .get('/evcharge/api/SessionsPerEV/' + input.ev + '/' + input.datefrom + '/' + input.dateto + '?format=json')
            .set('x-auth-token', token.token)
            .end((err, res) => {
                info = res.body;
                expect(res.status).to.eq(200);
                done()
            })
        });
        it('Should have all necessary properties', (done) => {
            expect(info).to.have.keys(
                'VehicleId',
                'RequestedTimestamp',
                'PeriodFrom',
                'PeriodTo',
                'TotalEnergyConsumed',
                'NumberOfVisitedPoints',
                'NumberOfVehicleChargingSessions',
                'VehicleChargingSessionSummaryList');
            done()
        });
        it('TotalEnergyConsumed should be equal with sum(VehicleChargingSessionSummaryList.EnergyDelivered)', (done) => {
            var sum = 0;
            for (var i in info.VehicleChargingSessionSummaryList)
                sum += parseFloat(info.VehicleChargingSessionSummaryList[i].EnergyDelivered);
            expect(Math.round((parseFloat(sum)) * 100)/100).to.eq(Math.round((info.TotalEnergyConsumed) * 100)/100);
            done().timeout(5000)
        })
    })
});

// Testing SessionsPerEV route in csv format
describe('Testing SessionsPerEV route exporting data in csv format [ GET /SessionsPerEV/:ev/:datefrom/:dateto?format=csv ]', () => {
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
    describe('Then export CSV sessions data for EV', () => {
        it('Should export data with status 200', (done) => {
            request(app)
            .get('/evcharge/api/SessionsPerEV/' + input.ev + '/' + input.datefrom + '/' + input.dateto + '?format=csv')
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