/* eslint-disable */
// https://www.npmjs.com/package/clean-split

"use strict"

const coerceRegex = require("regex-parser")
const parseRegex = require("regex-parse")
const escapeStringRegexp = require("escape-string-regexp")

module.exports = (string, delimiter, { anchor = "none" } = {}) => {
	let flags = "g"

	if (typeof delimiter === "string") {
		delimiter = escapeStringRegexp(delimiter)
	} else {
		const { main, options } = parseRegex(delimiter)
		delimiter = main
		flags = options
	}

	if (anchor === "none") return string.split(coerceRegex(`/(${delimiter})/${flags}`))
	if (anchor === "before" || anchor === "left") return string.split(coerceRegex(`/(?<=(?:${delimiter}))/${flags}`))
	return string.split(coerceRegex(`/(?=(?:${delimiter}))/${flags}`))
};
