'use strict'
const	{exec} = require('shelljs'),
	createVm = ({name, n}) =>
		`docker-machine create --driver virtualbox ${name}${n}`

module.exports = ({name, count}) => {
	for(var i=1; i<=count; i++){
		exec( createVm({name, n:i}) )
	}
}