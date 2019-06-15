'use strict'
const {exec} = require('shelljs'),
	startVm = require('./startVm')

module.exports = ({name, count}) => {
	var success = true
	for(var i=1; i<=count; i++){
		success = (exec( startVm({name, n:i}) ).code === 0) && success
	}
	return success
}