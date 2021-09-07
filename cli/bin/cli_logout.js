const fs    = require('fs')
const aux   = require('./auxx')
const axios = require('axios')
const https = require('https')

// command initializer
function logout (yargs) {
    argv = yargs
    .usage('Usage: $0 logout --apikey <API key>\n')
    .option("apikey", { describe: "Requesting user API key", type: "string", demandOption: true })
    .updateStrings( {'Options:': 'Parameters:'} )
    .version(false)
    .help(false)
    .wrap(null)
    .argv

    const nonEmptyInput = argv.apikey != "";
    if (!nonEmptyInput) { console.log('\x1b[31m%s\x1b[0m', 'Please enter your API key'); yargs.showHelp() }
    else                { logout_aux(argv.apikey, yargs) }
}

// gets the job done
function logout_aux (apikey, yargs) {

    const url = "https://localhost:8765/evcharge/api/logout/"

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
                (response) => {
                    fs.unlink('softeng20bAPI.token', (err) => { if (err) { console.error(err); return }} )
                    console.log("\x1b[32m","Successfully Logged Out")
                },
                (error) => { console.log('\x1b[31m%s\x1b[0m', error); }
            );
        }
        else { console.log('\x1b[31m%s\x1b[0m', 'Given API key does not correspond to a logged account'); yargs.showHelp() }
    })
}

module.exports = logout;