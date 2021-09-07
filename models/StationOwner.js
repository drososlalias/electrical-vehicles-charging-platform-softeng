const mongoose = require('mongoose');

const StationOwnerSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
    password: {
        type: String,
        required: true
    } ,
    station : String


});
module.exports = StationOwner = mongoose.model('stationowner', StationOwnerSchema); 