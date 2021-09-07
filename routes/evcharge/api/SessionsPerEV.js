const express = require('express');
const router = express.Router();
const config = require('config');
const { check, validationResult } = require('express-validator');
const Session = require('../../../models/Session');
const date = require('date-and-time');
const converter = require('json-2-csv');
const auth = require('../../../middleware/auth')
function toDate(value){
    return value.substring(0,4) + "-" + value.substring(4,6) + "-" + value.substring(6,8);
}

//////////////////////////////
router.get("/:vehiclePlates/:dateFrom/:dateTo" , auth ,
    [
        check('dateFrom', 'Enter date as YYYYMMDD').isLength({min:8 , max:8}),
        check('dateTo', 'Enter date as YYYYMMDD').isLength({min:8 , max:8})
    ],
    async function (req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
        const {  vehiclePlates ,dateFrom , dateTo} = req.params;
        const format = req.query.format;
        try{
            const now = new Date();
            await Session.find({
                $and:[
                    { "vehiclePlates" : vehiclePlates,
                        "sessionDate": {$gt: toDate(dateFrom) , $lt :toDate(dateTo)}
                    } ,
                ]
            } , {"_id" : 0  , "sessionDate" : 0 } , {},function (err,query) {
                if(err || query.length === 0) {return res.status(400).json({errors : "No results."})}
                let resss = [];
                let x = '';
                let visitedPoints = [];
                let totalEnergyDelivered = 0.0;
                for( let i = 0 ; i < query.length ; i++){
                    resss.push( {
                        "SessionIndex" : query[i]['stationInfo']['pointInfo']['sessionIndex'],
                        "SessionID" : query[i]['sessionId'],
                        "EnergyProvider" : query[i]['stationInfo']['provider']['providerName'],
                        "StartedOn" : query[i]['connectionTime'],
                        "FinishedOn" : query[i]['disconnectionTime'],
                        "EnergyDelivered" : query[i]['energyDelivered'],
                        "Payment" : query[i]['paymentMethod'],
                        "CostPerKwh" : query[i]['stationInfo']['costPerKwh'],
                        "SessionCost" : query[i]['totalCost']
                    })
                    x = query[i]['stationInfo']['pointInfo']['pointId']
                    if(!visitedPoints.includes(x)) visitedPoints.push(x);
                    let en = parseFloat(query[i]['energyDelivered']);
                    totalEnergyDelivered = totalEnergyDelivered + en;
                }

                if(format === 'json' || format === undefined){
                return res.json({
                    "VehicleId" : vehiclePlates ,
                    "RequestedTimestamp" :date.format(now, 'YYYY/MM/DD HH:mm:ss'),
                    "PeriodFrom" : toDate(dateFrom),
                    "PeriodTo" : toDate(dateTo),
                    "TotalEnergyConsumed": totalEnergyDelivered,
                    "NumberOfVisitedPoints" : visitedPoints.length,
                    "NumberOfVehicleChargingSessions" : query.length,
                    "VehicleChargingSessionSummaryList": resss
                })}
                if(format !== 'csv') return res.json({msg: "Enter Right Format type -> {json | csv}. Default is json. "})

                data = [
                    {
                        "VehicleId" : vehiclePlates ,
                        "RequestedTimestamp" :date.format(now, 'YYYY/MM/DD HH:mm:ss'),
                        "PeriodFrom" : toDate(dateFrom),
                        "PeriodTo" : toDate(dateTo),
                        "TotalEnergyConsumed": totalEnergyDelivered,
                        "NumberOfVisitedPoints" : visitedPoints.length,
                        "NumberOfVehicleChargingSessions" : query.length,
                        "VehicleChargingSessionSummaryList": resss
                    }
                ]
                converter.json2csv(data, function(err,csv)  {
                    if (err) {
                        throw err;
                    }
                    return res.send(csv);
                });

                    });
        } catch(err){
            res.status(400).json({errors: "No results"})
        }
    });

module.exports = router;
