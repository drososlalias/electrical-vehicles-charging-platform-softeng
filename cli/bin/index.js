#!/usr/bin/env node

const yargs = require("yargs");
const aux   = require("./auxx");

const healthcheck         = require('./cli_healthcheck');
const login               = require('./cli_login');
const logout              = require('./cli_logout');
const SessionsPerPoint    = require('./cli_SessionsPerPoint');
const SessionsPerStation  = require('./cli_SessionsPerStation');
const SessionsPerEV       = require('./cli_SessionsPerEV');
const SessionsPerProvider = require('./cli_SessionsPerProvider');
const Admin               = require('./cli_Admin');

const cli_command = yargs
    .usage("Usage: $0 <scope> <parameters> --format <format type>\nor     $0 <option> \n")
    .command('healthcheck',         'Check DB connection integrity',                 yargs => {healthcheck(yargs)})
    .command('login',               'Login as User|Admin',                           yargs => {login(yargs)})
    .command('logout',              'Logout',                                        yargs => {logout(yargs)})
    .command('SessionsPerPoint',    'Sessions data for point and period',            yargs => {SessionsPerPoint(yargs)})
    .command('SessionsPerStation',  'Sessions data for station and period',          yargs => {SessionsPerStation(yargs)})
    .command('SessionsPerEV',       'Sessions data for EV and period',               yargs => {SessionsPerEV(yargs)})
    .command('SessionsPerProvider', 'Sessions data for provider and period',         yargs => {SessionsPerProvider(yargs)})
    .command('Admin',               'Administrator login',                           yargs => {Admin(yargs)})
    .updateStrings( {'Commands:': "Scopes:"} )
    .argv;

aux.checkScope(cli_command._[0], yargs)