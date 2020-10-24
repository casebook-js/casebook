#!/usr/bin/env node

const path = require('path');
const os = require('os');

const chalk = require('chalk');
const compression = require('compression');
const express = require('express');
const serveIndex = require('serve-index');

const distDirname = require('../utils/get-distribution-dirname.js');

const onlyUnique = function (value, index, self) {
    return self.indexOf(value) === index;
};

const app = express();

app.use(compression());

const publicDirectory = path.resolve(__dirname, '..', distDirname);

app.use(express.static(publicDirectory));
app.use(serveIndex(publicDirectory));

console.log(chalk.green(`Starting up express server, serving ${publicDirectory}`));
app.listen(8080, function () {
    let ipAddresses = [];
    try {
        // eslint-disable-next-line no-mixed-operators
        ipAddresses = Object.values(os.networkInterfaces()).reduce((r, list) => r.concat(list.reduce((rr, i) => rr.concat(i.family === 'IPv4' && !i.internal && i.address || []), [])), []);
    } catch (e) {
        // Ignore
    }

    ipAddresses.unshift('127.0.0.1');
    ipAddresses.unshift('localhost');

    ipAddresses = ipAddresses.filter(onlyUnique);

    ipAddresses.sort();

    console.log(chalk.green('Available on:'));
    // eslint-disable-next-line no-restricted-syntax
    for (const ipAddress of ipAddresses) {
        console.log(chalk.blue(`  http://${ipAddress}:8080/`));
    }
    console.log('Hit CTRL-C to stop the server');
});
