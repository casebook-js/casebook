#!/usr/bin/env node

const path = require('path');
const ghpages = require('gh-pages');

const distDirname = require('../utils/get-distribution-dirname.js');

console.info('Pushing changes to: https://github.com/casebook-js/casebook/tree/gh-pages');
ghpages.publish(path.resolve(__dirname, '..', distDirname, 'casebook'), function (err) {
    if (err) {
        console.error('Failed to publish gh-pages at: https://casebook-js.github.io/casebook/');
    } else {
        console.info('Published gh-pages at: https://casebook-js.github.io/casebook/');
    }
});
