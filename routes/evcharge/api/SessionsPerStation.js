const auth = require('../../../middleware/auth')
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Session = require('../../../models/Session');
const date = require('date-and-time');
const converter = require('json-2-csv');
function toDate(value){
    return value.substring(0,4) + "-" + value.substring(4,6) + "-" + value.substring(6,8);
}

router.get("/:stationId/:dateFrom/:dateTo" , auth,
    [
        check('dateFrom', 'Enter date as YYYYMMDD').isLength({min:8 , max:8}),
        check('dateTo', 'Enter date as YYYYMMDD').isLength({min:8 , max:8})
    ],
    async function (req,res) {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() })
        }
        const {  stationId ,dateFrom , dateTo} = req.params;
        const format = req.query.format;
        try{
            const now = new Date();
            await Session.find({
                $and:[
                    { "stationInfo.stationId" : stationId,
                        "sessionDate": {$gt: toDate(dateFrom) , $lt :toDate(dateTo)}
                    } ,
                ]
            } , {"_id" : 0  , "sessionDate" : 0 } , {},function (err,query) {
                if(err || query.length == 0) {return res.json("No results.")}
                let resss = [];
                let x = '';
                let k = 0.0;

                let activePoints = [];
                let totalEnergy = 0;
                var point_freq_dictionary = {};
                var energyPerPoint = {};
                for( let i = 0; i < query.length; i++) {
                    x = query[i]['stationInfo']['pointInfo']['pointId']
                    k = query[i]['energyDelivered']
                    if(x in point_freq_dictionary)
                    {
                        point_freq_dictionary[x] += 1;
                        energyPerPoint[x] += parseFloat(k);
                    }
                    else{
                        point_freq_dictionary[x] = 1
                        energyPerPoint[x] = parseFloat(k);
                    }
                }
                for( let i = 0 ; i < query.length ; i++){
                    x = query[i]['stationInfo']['pointInfo']['pointId']
                    k = query[i]['energyDelivered']
                    if(!activePoints.includes(x)) {
                        resss.push( {
                            "PointId" : query[i]['stationInfo']['pointInfo']['pointId'],
                            "PointSessions" : point_freq_dictionary[x],
                            "EnergyDelivered" : energyPerPoint[x]
                        }); activePoints.push(x);
                    }

                    //if(!activePoints.includes(x))
                    let y = query[i]['energyDelivered']
                    totalEnergy = totalEnergy + parseFloat(y);
                }

                if(format === 'json' || format === undefined){
                    return res.json({
                        "StationId" : stationId ,
                        "Operator" : query[0]['stationInfo']['stationOperator'],
                        "RequestedTimestamp" :date.format(now, 'YYYY/MM/DD HH:mm:ss'),
                        "PeriodFrom" : toDate(dateFrom),
                        "PeriodTo" : toDate(dateTo),
                        "TotalEnergyDelivered": totalEnergy,
                        "NumberOfChargingSessions" : query.length,
                        "NumberOfActivePoints": activePoints.length,
                        "SessionSummaryList": resss
                    });
                }
                if(format !== 'csv') return res.json({msg: "Enter Right Format type -> {json | csv}. Default is json. "})

                const data = [
                    {
                        "StationId" : stationId ,
                        "Operator" : query[0]['stationInfo']['stationOperator'],
                        "RequestedTimestamp" :date.format(now, 'YYYY/MM/DD HH:mm:ss'),
                        "PeriodFrom" : toDate(dateFrom),
                        "PeriodTo" : toDate(dateTo),
                        "TotalEnergyDelivered": totalEnergy,
                        "NumberOfChargingSessions" : query.length,
                        "NumberOfActivePoints": activePoints.length,
                        "SessionSummaryList": resss
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
