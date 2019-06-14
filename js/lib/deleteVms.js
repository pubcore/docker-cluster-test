'use strict'
const	{exec} = require('shelljs'),
	deleteVm = ({name, n}) => `docker-machine rm -f ${name}${n}`

module.exports = ({name, count}) => {
	var success = true
	for(var i=1; i<=count; i++){
		success = (exec(deleteVm({name, n:i})).code === 0) && success
	}
	return success
}