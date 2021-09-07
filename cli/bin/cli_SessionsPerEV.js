const axios = require('axios')
const aux   = require('./auxx')
const https = require('https')

// command initializer
function SessionsPerEV (yargs) {
    argv = yargs
    .usage('Usage: $0 SessionsPerEV --ev <vehicle plates> --datefrom <date> --dateto <date> --format [json | csv] --apikey <API key>\n')
    .option("ev",       { describe: "EV Plates Id",                         type: "string", demandOption: true })
    .option("datefrom", { describe: "Starting date in the form: YYYYMMDD",  type: "string", demandOption: true })
    .option("dateto",   { describe: "Ending date in the form: YYYYMMDD",    type: "string", demandOption: true })
    .option("format",   { describe: "Format of exported data [json | csv]", type: "string", demandOption: true })
    .option("apikey",   { describe: "Requesting user API key",              type: "string", demandOption: true })
    .updateStrings( {'Options:': 'Parameters:'} )
    .version(false)
    .help(false)
    .wrap(null)
    .argv

    const nonEmptyInput = (argv.ev != "") && (argv.datefrom != "") && (argv.dateto != "") && (aux.checkFormat(argv.format)) && (argv.apikey != "");
    if (!nonEmptyInput) { console.log('\x1b[31m%s\x1b[0m', 'Parameters must have a specific format'); yargs.showHelp() }
    else                { SessionsPerEV_aux(argv.ev, argv.datefrom, argv.dateto, argv.format, argv.apikey) }
}

// gets the job done
function SessionsPerEV_aux (evId, datefrom, dateto, format, apikey) {

    const url = "https://localhost:8765/evcharge/api/SessionsPerEV/" + evId + "/" + datefrom + "/" + dateto + "?format=" + format;

    aux.isLoggedIn(apikey).then( logged => {
        if (logged) {
            config = {
                method: 'get',
                url: url,
                httpsAgent: new https.Agent({rejectUnauthorized: false}),
                headers: { "x-auth-token": apikey }
            }
            axios(config)
            .then(
                (response) => {
                    try      { console.log(response.data) }
                    catch(e) { console.log('Error:', e.stack); }
                },
                (error) => { console.log('\x1b[31m%s\x1b[0m', error.response); }
            );
        }
        else { console.log('\x1b[31m%s\x1b[0m', 'Given API key does not correspond to a logged account'); yargs.showHelp() }
    })
}

module.exports = SessionsPerEV;