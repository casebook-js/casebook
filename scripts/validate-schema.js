#!/usr/bin/env node

const util = require('util');

const Ajv = require('ajv');

const schema = require('../data/contents/schema.json');
const contentsJson = require('../src/parse-data/read-contents-and-filter.js');

const ajv = new Ajv();
const validate = ajv.compile(schema);
const valid = validate(contentsJson);

if (!valid) {
    console.log(
        util.inspect(
            validate.errors,
            {
                colors: true,
                depth: Infinity
            }
        )
    );
    process.exit(1);
}
