const mongoose = require('mongoose');

const ExpiredTokenSchema = new mongoose.Schema({
    tokenID:{
        type: String,
        required: true
    }
});
module.exports = ExpiredToken = mongoose.model('expiredtoken', ExpiredTokenSchema);