const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
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
    },
    vehicles: [
        {
            plates : String,
            brand: String,
            type: String
        }
    ],
    isAdmin: Boolean

});
module.exports = User = mongoose.model('user', UserSchema);