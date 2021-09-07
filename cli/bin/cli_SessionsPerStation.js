const axios = require('axios')
const aux   = require('./auxx')
const https = require('https')

// command initializer
function SessionsPerStation (yargs) {
    argv = yargs
    .usage('Usage: $0 SessionsPerStation --station <stationId> --datefrom <date> --dateto <date> --format [json | csv] --apikey <API key>\n')
    .option("station",  { describe: "Station Id",                           type: "string", demandOption: true })
    .option("datefrom", { describe: "Starting date in the form: YYYYMMDD",  type: "string", demandOption: true })
    .option("dateto",   { describe: "Ending date in the form: YYYYMMDD",    type: "string", demandOption: true })
    .option("format",   { describe: "Format of exported data [json | csv]", type: "string", demandOption: true })
    .option("apikey",   { describe: "Requesting user API key",              type: "string", demandOption: true })
    .updateStrings( {'Options:': 'Parameters:'} )
    .version(false)
    .help(false)
    .wrap(null)
    .argv

    const nonEmptyInput = (argv.station != "") && (argv.datefrom != "") && (argv.dateto != "") && (aux.checkFormat(argv.format)) && (argv.apikey != "");
    if (!nonEmptyInput) { console.log('\x1b[31m%s\x1b[0m', 'Parameters must have a specific format'); yargs.showHelp() }
    else                { SessionsPerStation_aux(argv.station, argv.datefrom, argv.dateto, argv.format, argv.apikey) }
}

// gets the job done
function SessionsPerStation_aux (stationId, datefrom, dateto, format, apikey) {

    const url = "https://localhost:8765/evcharge/api/SessionsPerStation/" + stationId + "/" + datefrom + "/" + dateto + "?format=" + format;

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

module.exports = SessionsPerStation;