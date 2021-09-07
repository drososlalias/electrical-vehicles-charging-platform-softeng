const axios       = require('axios')
const aux         = require('./auxx')
const healthcheck = require('./cli_healthcheck')

// Admin function: healthcheck
function admin_healthcheck (apikey) {

    aux.isLoggedIn(apikey).then( logged => {
        if (logged) { healthcheck() }
        else        { console.log('\x1b[31m%s\x1b[0m', 'Given API key does not correspond to a logged account'); yargs.showHelp() }
    })
}

module.exports = admin_healthcheck;