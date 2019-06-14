'use strict'
const {exec} = require('shelljs'),
	startVm = require('./startVm')

module.exports = ({name, count}) => {
	for(var i=1; i<=count; i++){
		exec( startVm({name, n:i}) )
	}
}