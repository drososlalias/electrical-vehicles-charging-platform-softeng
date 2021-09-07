const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
    pointId: String ,
    pointOperator: String,
    types :[String]

});
module.exports = Point = mongoose.model('point' , PointSchema);