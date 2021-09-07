const chalk = require("chalk");
const boxen = require("boxen");
const fs    = require("fs");

const boxenOptions = {
    padding: 2,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
};

const possible_scopes = [
    'healthcheck',
    'resetsessions',
    'login',
    'logout',
    'SessionsPerPoint',
    'SessionsPerStation',
    'SessionsPerEV',
    'SessionsPerProvider',
    'Admin'
]

// check input validity
function checkScope (scope, yargs) {
    if (typeof scope == 'undefined') {
        console.log(boxen( chalk.white.bold("Electric Vehicle Charging Management System"), boxenOptions ));
        yargs.showHelp();
        return false
    }
    if (!possible_scopes.includes(scope)) {
        console.log('\x1b[31m%s\x1b[0m', "\"" + scope + "\"" + " is not a valid scope\n")
        return false
    }
    return true
}

// check format validity
function checkFormat (format) {
    if (format != 'csv' && format != 'json')
        return false
    return true
}

// check mode validity
function checkMode (mode) {
    if (mode != 'user' && mode != 'stationowner' && mode != 'admin')
        return false
    return true
}

// check if user is logged in - apikey is in "softeng20bAPI.token"
function isLoggedIn (apikey) {
    return new Promise(
        res => {
            fs.readFile("softeng20bAPI.token", "utf-8", (err, token) => {
                if (err) { return res(false) }
                else     { return res(token == apikey); }
})})}

// determine which setting Admin command will do
function chosenSetting (usermod, users, sessionupd, healthcheck, resetsessions) {
    if (typeof usermod != 'undefined')
        return 'usermod'
    if (typeof users != 'undefined')
        return 'users'
    if (typeof sessionupd != 'undefined')
        return 'sessionupd'
    if (typeof healthcheck != 'undefined')
        return 'healthcheck'
    if (typeof resetsessions != 'undefined')
        return 'resetsessions'
    return 'none'
}

module.exports = {
    checkScope:    checkScope,
    checkFormat:   checkFormat,
    checkMode:     checkMode,
    isLoggedIn:    isLoggedIn,
    chosenSetting: chosenSetting
};