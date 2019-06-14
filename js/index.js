'use strict'
const isInstalled = require('./lib/isInstalled'),
	createVms = require('./lib/createVms'),
	stopVm = require('./lib/stopVm'),
	stopVms = require('./lib/stopVms'),
	startVm = require('./lib/startVm'),
	startVms = require('./lib/startVms'),
	deleteVms = require('./lib/deleteVms'),
	createSwarm = require('./lib/createSwarm'),
	isReady = require('./lib/isReady'),
	getVmIp = require('./lib/getVmIp'),
	{exec} = require('shelljs')

module.exports = {
	isInstalled, createVms,
	startVm: arg => exec(startVm(arg)).code === 0,
	startVms, createSwarm, isReady, getVmIp,
	stopVm: arg => exec(stopVm(arg)).code===0,
	stopVms, deleteVms
}