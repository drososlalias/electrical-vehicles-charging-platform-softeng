const mongoose = require('mongoose');
const Double = require('bson');

const SessionSchema = new mongoose.Schema({
    sessionId : {
        type: String,
        required: true
    },
    vehiclePlates : {
        type: String,
        required : true
    },
    stationInfo : {
        stationId: String,
        stationOperator: String,
        pointInfo : {
            pointId : String ,
            pointOperator:String ,
            sessionIndex: String
        },
        costPerKwh : String,
        provider : {
            providerId : String ,
            providerName: String
        },
        },
    connectionTime : {
        type: String ,
        required: true
    },
    disconnectionTime : {
        type: String,
        required: true
    },
    sessionDate:{
        type : String ,
        required : true
    },
    energyDelivered: {
        type: Double,
        required: true
    },
    protocol: {
        type: String,
        required: true
    },
    paymentMethod : {
        type: String,
        required: true
    },
    totalCost : {
        type: Double,
        required: true
    },
    vehicleType : {
        type: String,
        required : true
    }


});
module.exports = Session = mongoose.model('session' , SessionSchema);