const aux      = require('./auxx')
const FormData = require('form-data');
const axios    = require('axios');
const fs       = require('fs');
const request  = require('request');
const https    = require('https')


// Admin function: sessionupd
function sessionupd (source, apikey) {

    const url = "https://localhost:8765/evcharge/api/admin/sessionupd";
    
    aux.isLoggedIn(apikey).then( logged => {
        if (logged) {
            var config = {
                method: 'post',
                url: url,
                headers: {
                    'x-auth-token': apikey,
                    'Content-Type' : 'multipart/form-data'
                },
                formData: {
                    "file" : fs.createReadStream(source)  
                },
                rejectUnauthorized: false
            };
                request(config, function (err, data, body) { console.log(body) })
            }
        else { console.log('\x1b[31m%s\x1b[0m', 'Given API key does not correspond to a logged account'); yargs.showHelp() }
    })
}

module.exports = sessionupd;