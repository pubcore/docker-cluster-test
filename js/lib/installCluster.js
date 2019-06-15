'use strict'
const createVms = require('./createVms')
const startVms = require('./startVms')
const createSwarm = require('./createSwarm')

module.exports = vmSet => {
	createVms(vmSet)
	startVms(vmSet)
	createSwarm(vmSet)
}