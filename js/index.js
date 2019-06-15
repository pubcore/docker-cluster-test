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
	installCluster = require('./lib/installCluster'),
	purgeCluster = require('./lib/purgeCluster'),
	{exec} = require('shelljs')

module.exports = {
	isInstalled, createVms, startVms, createSwarm, isReady, getVmIp, stopVms,
	deleteVms, installCluster, purgeCluster,
	startVm: arg => exec(startVm(arg)).code === 0,
	stopVm: arg => exec(stopVm(arg)).code === 0
}