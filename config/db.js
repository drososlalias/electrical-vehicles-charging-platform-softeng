const mongoose = require('mongoose');
const config   = require('config');
const mainDB   = config.get('mongoURI');
const testDB   = config.get('testMongoURI')
var db;

if(process.env.NODE_ENV === 'test')
    db = testDB
else
    db = mainDB

const connectDB = async () => {
    try {
        await mongoose.connect(db ,{ 
            useNewUrlParser: true, 
            useUnifiedTopology: true ,
            useCreateIndex: true,
            useFindAndModify: false
        }); 
        console.log('MongoDB connected');
    }
    catch(err){
        console.error(err.message);
        //Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB; 