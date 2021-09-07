const mongoose = require('mongoose');

const StationMapsSchema = new mongoose.Schema({
    stationId: String,
    lat : String,
    lng : String
});
module.exports = StationMaps = mongoose.model('station', StationMapsSchema);
