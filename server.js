const express = require('express');
const https = require('https');
const path = require('path');
const fs = require('fs');
var cors = require('cors');
const connectDB = require('./config/db');
const app = express();

//ConnectDB
connectDB();

//Init Middleware
app.use(express.json({extended: false}));

app.use(cors());

app.get('/' , (req,res) => res.send('API Running'));

// Define Routes
app.use('/evcharge/api/login',require('./routes/evcharge/api/login'));
app.use('/evcharge/api/admin',require('./routes/evcharge/api/admin'));
app.use('/evcharge/api/logout',require('./routes/evcharge/api/logout'));
app.use('/evcharge/api/SessionsPerPoint',require('./routes/evcharge/api/SessionsPerPoint'));
app.use('/evcharge/api/SessionsPerEV',require('./routes/evcharge/api/SessionsPerEV'));
app.use('/evcharge/api/SessionsPerStation',require('./routes/evcharge/api/SessionsPerStation'));
app.use('/evcharge/api/SessionsPerProvider',require('./routes/evcharge/api/SessionsPerProvider'));
const PORT = process.env.PORT || 8765 ;

const sslServer = https.createServer(
    {
        key : fs.readFileSync(path.join(__dirname,'cert','server.key')),
        cert: fs.readFileSync(path.join(__dirname,'cert','server.crt'))
    },app
);
sslServer.listen(PORT, () =>console.log(`Server started on port ${PORT}`));

module.exports.app = app
