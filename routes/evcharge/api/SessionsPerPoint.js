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
router.get("/:pointId/:dateFrom/:dateTo" , auth ,
    [
        check('dateFrom', 'Enter date as YYYYMMDD').isLength({min:8 , max:8}),
        check('dateTo', 'Enter date as YYYYMMDD').isLength({min:8 , max:8})
    ],
    async function (req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
        const {  pointId ,dateFrom , dateTo} = req.params;
        const format = req.query.format;
        try{
            const now = new Date();
            let query = await Session.find({
                $and:[
                    { "stationInfo.pointInfo.pointId" : pointId,
                        "sessionDate": {$gt: toDate(dateFrom) , $lt :toDate(dateTo)}
                    } ,
                ]
            } , {"_id" : 0 , "totalCost" : 0 , "sessionDate" : 0 } , {},function (err,query) {
                if(err || query.length == 0) {return res.json("No results.")}
                let resss = [];
                for(var i = 0 ; i < query.length ; i++){
                       resss.push( {"Session Index " : query[i]['vehicleType'],
                        "Session ID" : query[i]['sessionId'],
                        "Started On" : query[i]['connectionTime'],
                        "Finished On" : query[i]['disconnectionTime'],
                        "Protocol" : query[i]['protocol'],
                        "Energy Delivered" : query[i]['energyDelivered'],
                        "Payment" : query[i]['paymentMethod'],
                        "Vehicle Type" : query[i]['vehicleType'] })}

                if(format === 'json' || format == undefined){
                return res.json({
                    "pointId" : pointId ,
                    "pointOperator" : query[0]['stationInfo']['pointInfo']['pointOperator'],
                    "RequestedTimestamp" :date.format(now, 'YYYY/MM/DD HH:mm:ss'),
                    "PeriodFrom" : toDate(dateFrom),
                    "PeriodTo" : toDate(dateTo),
                    "NumberOfChargingSessions" : query.length,
                    "ChargingSessionList": resss
                }) }

                if(format !== 'csv') return res.json({msg: "Enter Right Format type -> {json | csv}. Default is json. "})

                data = [
                    {
                        "pointId" : pointId ,
                        "pointOperator" : query[0]['stationInfo']['pointInfo']['pointOperator'],
                        "RequestedTimestamp" :date.format(now, 'YYYY/MM/DD HH:mm:ss'),
                        "PeriodFrom" : toDate(dateFrom),
                        "PeriodTo" : toDate(dateTo),
                        "NumberOfChargingSessions" : query.length,
                        "ChargingSessionList": resss
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
            console.error(err.message);
        }
    });

module.exports = router;





