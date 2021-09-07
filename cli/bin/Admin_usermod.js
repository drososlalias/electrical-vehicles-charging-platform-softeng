const axios = require('axios')
const aux   = require('./auxx')
const https = require('https')

// Admin function: usermod
function usermod (username, password, isStationOwner, apikey) {

    const url = "https://localhost:8765/evcharge/api/admin/usermod/" + username + "/" + password + "/" + isStationOwner;
    aux.isLoggedIn(apikey).then( logged => {
        if (logged) {
            config = {
                method: 'post',
                url: url,
                httpsAgent: new https.Agent({rejectUnauthorized: false}),
                headers: { "x-auth-token": apikey }
            };
            axios(config)
            .then(
                (response) => { console.log(response.data) },
                (error)    => { console.log('\x1b[31m%s\x1b[0m', error.response.data); }
            );
        }
        else { console.log('\x1b[31m%s\x1b[0m', 'Given API key does not correspond to a logged account'); yargs.showHelp() }
    })
}

module.exports = usermod;