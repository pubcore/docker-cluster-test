'use strict'
const	{which,echo} = require('shelljs')

module.exports = commands => commands.reduce((agr, command) =>
	agr = agr && (which(command) || !echo(`${command} is not installed`)), true)