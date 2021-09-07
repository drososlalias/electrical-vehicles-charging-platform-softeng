const express = require('express');
const router = express.Router();
const converter = require('json-2-csv');
const { check, validationResult } = require('express-validator');
const Session = require('../../../models/Session');
const auth = require('../../../middleware/auth')
function toDate(value){
    return value.substring(0,4) + "-" + value.substring(4,6) + "-" + value.substring(6,8);
}


/////   CSV TRIAL
router.get("/:providerId/:dateFrom/:dateTo" ,auth ,
    [
        check('dateFrom', 'Enter date as YYYYMMDD').isLength({min:8 , max:8}),
        check('dateTo', 'Enter date as YYYYMMDD').isLength({min:8 , max:8})
    ],
    async function (req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
        const {  providerId ,dateFrom , dateTo} = req.params;
        const format = req.query.format;
        try{
            const now = new Date();
            await Session.find({
                $and:[
                    { "stationInfo.provider.providerId" : providerId,
                        "sessionDate": {$gt: toDate(dateFrom) , $lt :toDate(dateTo)}
                    } ,
                ]
            } , {"_id" : 0  , "sessionDate" : 0 } , {},function (err,query) {
                if(err || query.length == 0) {return res.json("No results.")}
                let resss = [];
                for( let i = 0 ; i < query.length ; i++){
                    resss.push( {
                        "Session ID" : query[i]['sessionId'],
                        "VehiclePlates" : query[i]['vehiclePlates'],
                        "Started On" : query[i]['connectionTime'],
                        "Finished On" : query[i]['disconnectionTime'],
                        "EnergyDelivered" : query[i]['energyDelivered'],
                        "CostPerKwh" : query[i]['stationInfo']['costPerKwh'],
                        "SessionCost" : query[i]['totalCost']
                    })
                }


                if(format === 'json' || format === undefined){
                    return res.json({
                        "ProviderId": query[0]['stationInfo']['provider']['providerId'],
                        "ProviderName": query[0]['stationInfo']['provider']['providerName'],
                        "StationId": query[0]['stationInfo']['stationId'],
                        "ChargingSessionList": resss
                    });
                }
                if(format !== 'csv') return res.json({msg: "Enter Right Format type -> {json | csv}. Default is json. "})

                const data = [{
                    "ProviderId": query[0]['stationInfo']['provider']['providerId'],
                    "ProviderName": query[0]['stationInfo']['provider']['providerName'],
                    "StationId": query[0]['stationInfo']['stationId'],
                    "ChargingSessionList": resss
                }]
                converter.json2csv(data, function(err,csv)  {
                    if (err) {
                        throw err;
                    }
                    return res.send(csv);
                });

            });
        } catch(err){
            console.error(err.message);
        }
    });

module.exports = router;
