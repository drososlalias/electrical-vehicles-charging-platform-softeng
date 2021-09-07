const axios = require('axios')
const https = require('https')

// check database connection
function healthcheck () {

    const url = "https://localhost:8765/evcharge/api/admin/healthcheck";
    config = {
        method: 'get',
        url: url,
        httpsAgent: new https.Agent({rejectUnauthorized: false})
    };
    axios(config)
    .then(
        (response) => { console.log(response.data) },
        (error)    => { console.log('\x1b[31m%s\x1b[0m', error); console.log('\x1b[31m%s\x1b[0m', "Please check if server is up and running...") }
    );
}

module.exports = healthcheck;