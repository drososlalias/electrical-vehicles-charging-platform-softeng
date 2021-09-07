const fs    = require('fs')
const axios = require('axios')
const aux   = require('./auxx')
const https = require('https')

// command initializer
function login (yargs) {
    argv = yargs
    .usage('Usage: $0 login --username <username> --passw <password> --mode [user | stationowner | admin]\n')
    .option("username", { describe: "Admin username",                                 type: "string", demandOption: true })
    .option("passw",    { describe: "Admin password",                                 type: "string", demandOption: true })
    .option("mode",     { describe: "Log in as <mode> [user | stationowner | admin]", type: "string", demandOption: true })
    .updateStrings( {'Options:': 'Parameters:'} )
    .version(false)
    .help(false)
    .wrap(null)
    .argv

    const nonEmptyInput = (argv.username != "") && (argv.passw != "") && (aux.checkMode(argv.mode))
    if (!nonEmptyInput) { console.log('\x1b[31m%s\x1b[0m', 'Parameters must have a specific format'); yargs.showHelp() }
    else                { login_aux(argv.username, argv.passw, argv.mode) }
}

// gets the job done
function login_aux (username, password, mode) {

    var Mode;
    if (mode == 'admin' || mode == 'user') { Mode = "false" }
    else                                   { Mode = "true"  }

    const url = "https://localhost:8765/evcharge/api/login/" + username + "/" + password + "/" + Mode;
    config = {
        method: 'post',
        url: url,
        httpsAgent: new https.Agent({rejectUnauthorized: false})
    };
    axios(config)
    .then(
        (response) => {
            try {
                fs.writeFileSync('softeng20bAPI.token', response.data.token);  
                console.log("\x1b[32m","Successfully Logged In")
            } catch(e) {
                console.log('Error:', e.stack);
            }
        },
        (error) => { console.log('\x1b[31m%s\x1b[0m', error.response); }
    );
}

module.exports = login;