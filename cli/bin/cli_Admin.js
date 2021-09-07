const aux           = require('./auxx')
const usermod       = require('./Admin_usermod')
const users         = require('./Admin_users')
const sessionupd    = require('./Admin_sessionupd')
const healthcheck   = require('./Admin_healthcheck')
const resetsessions = require('./Admin_resetsessions')

// command initializer
function Admin (yargs) {
    argv = yargs
    .usage('Usage: $0 Admin --usermod --username <username> --passw <password> --stationowner [true | false] --apikey <API key>')
    .usage('or     $0 Admin --users <username> --stationowner [true | false] --apikey <API key>')
    .usage('or     $0 Admin --sessionsupd --source <CSV filename> --apikey <API key>')
    .usage('or     $0 Admin --healthcheck --apikey <API key>')
    .usage('or     $0 Admin --resetsessions --apikey <API key>')
    .option("usermod",       { describe: "Register or change user's password", type: "string" })
    .option("username",      { describe: "User's username"                   , type: "string" })
    .option("passw",         { describe: "User's new password"               , type: "string" })
    .option("stationowner",  { describe: "Station owner or not"              , type: "string" })
    .option("users",         { describe: "Show user status"                  , type: "string" })
    .option("sessionupd",    { describe: "Add new sessions from csv file"    , type: "string" })
    .option("source",        { describe: "Path to CSV file"                  , type: "string" })
    .option("healthcheck",   { describe: "Check DB connection integrity"     , type: "string" })
    .option("resetsessions", { describe: "Reset sessions & initialize admin" , type: "string" })
    .option("apikey",        { describe: "Requesting user API key"           , type: "string", demandOption: true })
    .updateStrings( {'Options:': 'Parameters:'} )
    .version(false)
    .help(false)
    .wrap(null)
    .argv

    const chosen_setting = aux.chosenSetting(argv.usermod, argv.users, argv.sessionupd, argv.healthcheck, argv.resetsessions)
    switch (chosen_setting) {
        case 'usermod':
            var inputIsValid = (argv.username != "") && (argv.passw != "") && (argv.stationowner != "") && (argv.apikey != "");
            if (inputIsValid) { usermod(argv.username, argv.passw, argv.stationowner, argv.apikey) }
            else              { console.log("Please enter non-empty parameters for \"usermod\" function") }
            break;
        case 'users':
            var inputIsValid = (argv.username != "") && (argv.stationowner != "") && (argv.apikey != "");
            if (inputIsValid) { users(argv.username, argv.stationowner, argv.apikey) }
            else              { console.log("Please enter non-empty parameters for \"users\" function") }
            break;
        case 'sessionupd':
            var inputIsValid = (argv.source != "") && (argv.apikey != "");
            if (inputIsValid) { sessionupd(argv.source, argv.apikey) }
            else              { console.log("Please enter non-empty parameters for \"sessionupd\" function") }
            break;
        case 'healthcheck':
            var inputIsValid = argv.apikey != "";
            if (inputIsValid) { healthcheck(argv.apikey) }
            else              { console.log("Please enter non-empty API key") }
            break;
        case 'resetsessions':
            var inputIsValid = argv.apikey != "";
            if (inputIsValid) { resetsessions(argv.apikey) }
            else              { console.log("Please enter non-empty API key") }
            break;
        default:
            yargs.showHelp()
      }
}

module.exports = Admin;