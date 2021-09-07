# Tesla-lias Gr

[![Build Status](https://travis-ci.com/panga/node-shield.svg?branch=master)](https://travis-ci.com/panga/node-shield)
![version](https://img.shields.io/badge/version-1.0.0-blue)
[![Node version](http://img.shields.io/badge/node-15.10.0-blue.svg)](http://img.shields.io/badge/node-0.10.x-brightgreen.svg)
[![NPM version](http://img.shields.io/badge/npm-7.6.1-blue.svg)](http://img.shields.io/badge/npm-7.6.1-blue.svg)
![APMLicense](https://img.shields.io/badge/license-MIT-green.svg)

This app is compatible with Unix and Unix-like operating systems.

## :zap: Electric Vehicle Charging Management Software

This project aims to provide an Electric Vehicle Charging Management System, which will allow:

* EV drivers to pay online for charging their electric vehicle, search for an EV station on Google Maps, export various data on their charging history

* EV station owners to access information about their stations' charging statistics

The system is meant to be managed by a unique administrator.


_This repository hosts the [Software Engineering](https://shmmy.ntua.gr/wiki/index.php/Τεχνολογία_Λογισμικού) assignment for NTUA Course "Software Engineering" (Winter 2020-2021)._


## :muscle: Team Members

This project was curated by "Watts_n_Volts" team comprising of (alphabetical order):
 * [Nafsika Abatzi  ](https://github.com/nafsika24)    (AM: 03117198, nafsika.abatzi@gmail.com)
 * [Dimitris Dimos  ](https://github.com/d-dimos)      (AM: 03117165, dimitris.dimos647@gmail.com)
 * [Giorgos Themelis](https://github.com/gdthemis)     (AM: 03117131, gdthem@gmail.com)
 * [Drosos Lalias   ](https://github.com/drososlalias) (AM: 03117881, drososlalias@gmail.com)


## :gear: Software Components

The app comes with 2 access points:

* a _Frontend client_ developed using React, meant to be used by EV drivers and EV station owners
* a _CLI client_ developed using Nodejs, meant to be also used by the system's main administrator 

and uses _MongoDB Atlas_ :leaves: database, holding information about the whole system.

Backend - Frontend communication is made through a nodejs developed _REST API_.  



## :link: Build Automation

In this repository there is a _makefile_ mant to install the system's dependencies. To autobuild your app:

* open a terminal and clone the repository
```bash
git clone https://github.com/ntua/TL20-64
```
* change to repo's main directory (makefile's directory)
```bash
cd PATH-TO-MAIN-DIRECTORY
```

* autobuild dependencies
```bash
make all
```
And there you have it (CLI client is also enabled globally)

## Testing

In order to test the project's back-end change to main directory and run:
```bash
make tests
```

## Open SSL - Certificates setup
By typing
```bash
npm run dev
```

you start the server and your default browser (we suggest Chrome) runs the front-end.
You may encounter protection issues, due to the use of HTTPS protocol. In order to geto over this problem you need to:

* Change to _client_ directory and create a file named: _.env_
* Inside, type:
```bash
HTTPS=true
SSL_CRT_FILE= path/to/server.crt
SSL_KEY_FILE=path/to/server.key
```
* afterwards, if the issue insists on coming up, follow the next instructions:

1. Double click on the certificate (server.crt)
2. Select your desired keychain (login should suffice)
3. Add the certificate
4. Open Keychain Access if it isn’t already open
5. Select the keychain you chose earlier
6. You should see the certificate localhost
7. Double click on the certificate
8. Expand Trust
9. Select the option Always Trust in When using this certificate
10. Close the certificate window

Everything should be in place now and the site should be running smoothly.

## CLI client

Makee sure before you run the CLI, that you have launched the server by typing:
```bash
npm run server
```
in a terminal into the main directory of the repo.

After the "make all" command at the beggining of the installation, the CLI has been installed globally. So open a terminal and type:
```bash
ev_group64
```
The main menu appears and you can then choose your desired action.
