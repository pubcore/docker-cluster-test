'use strict'
const	{exec} = require('shelljs'),
	createVm = ({name, n}) =>
		`docker-machine create --driver virtualbox ${name}${n}`

module.exports = ({name, count}) => {
	var success = true
	for(var i=1; i<=count; i++){
		success = (exec( createVm({name, n:i}) ).code === 0) && success
	}
	return success
}