'use strict'
const {exec} = require('shelljs')

module.exports = ({name, n, count}) => {
	var {stdout} = exec('docker-machine ls', {silent:true}),
		regex = new RegExp(`^${name}${n||count} .+(192\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3})`, 'm')
	return (regex.exec(stdout)||[])[1] || ''
}