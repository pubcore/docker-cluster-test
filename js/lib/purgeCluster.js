'use strict'
const stopVms = require('./stopVms'),
	deleteVms = require('./deleteVms')

module.exports = vmSet => stopVms(vmSet) && deleteVms(vmSet)