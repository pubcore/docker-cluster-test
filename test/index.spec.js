'use strict'
const	{ok, equal} = require('assert'),
	main = require('../js/index'),
	{isInstalled, createVms, startVms, createSwarm, stopVms, deleteVms,
		isReady, getVmIp, startVm, stopVm} = main,
	vmSet = {count:2, name:'vm'},
	tools = ['docker', 'docker-machine', 'virtualbox'],
	{deploy} = require('@pubcore/node-docker-build'),
	{resolve} = require('path')

describe('my module', ()=>{
	it('exports an object', () =>{
		ok(typeof main === 'object')
	})
	it('can create 2 vms, init a docker swarm and purge it all on success', () =>
		new Promise(res => {
			if(isInstalled(tools)){
				createVms(vmSet)
				startVms(vmSet)
				createSwarm(vmSet)
				deploy({
					moduleName:resolve(__dirname, '../localhost/config'),
					logPath:'../../../../'
				})
				isReady({host:getVmIp(vmSet), port:8080}).then(() => {
					//test startVm function
					if(startVm({...vmSet, n:1})){
						return res('starting already running vm must fail')
					}
					//test stopVm function
					if(stopVm({name:'notExist', n:1})){
						return res('stopping a non exsisting vm must fail')
					}
					res(stopVms(vmSet) && deleteVms(vmSet) && 'ok')
				},
				() => res('test-service was not reachable on swarm'))
			}else{
				res('missing tools')
			}
		}).then(res => equal(res, 'ok'))
	).timeout(300000)
})