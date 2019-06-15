'use strict'

const	{equal} = require('assert'),
	{
		isInstalled, installCluster, purgeCluster, isReady, getVmIp, startVm, stopVm
	} = require('../js/index'),
	vmSet = {count:2, name:'vm'},
	{deploy} = require('@pubcore/node-docker-build'),
	{resolve} = require('path'),
	tools = ['docker', 'docker-machine', 'virtualbox']

describe('functions to create local test cluster', ()=>{
	it('can create 2 vms, init a docker swarm and purge it all on success', () =>
		new Promise(res => {
			if(isInstalled(tools)){
				installCluster(vmSet)
				deploy({
					moduleName:resolve(__dirname, '../localhost/config'),
					logPath:'../../../../'
				})
				isReady({host:getVmIp(vmSet), port:8080}).then(() => {
					if(startVm({...vmSet, n:1})){
						return res('starting already running vm must fail')
					}
					if(stopVm({name:'notExist', n:1})){
						return res('stopping a non exsisting vm must fail')
					}
					res(purgeCluster(vmSet) && 'ok')
				},
				() => res('test-service was not reachable on swarm'))
			}else{
				res('missing tools')
			}
		}).then(res => equal(res, 'ok'))
	).timeout(300000)
})