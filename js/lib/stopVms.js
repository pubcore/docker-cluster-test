'use strict'
const	{exec} = require('shelljs'),
	stopVm = require('./stopVm')

module.exports = ({name, count}) => {
	var success = true
	for(var i=1; i<=count; i++){
		success = (exec( stopVm({name, n:i}) ).code === 0) && success
	}
	return success
}