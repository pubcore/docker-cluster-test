## package to create a (local) docker swarm cluster for testing
This package can be used for scripts (js) to create a docker swarm cluster
as a foundation for testing of services dealing with distributed data.
Testing the behaviour of distributed-data-services, for instance, if a node goes
down, leads to the motivation for this package: create a test-cluster,
deploy a service, create some test-load and in parallel shoot down a node.

#### Prerequisites
* Mac, Linux, Windows 7 and 8
* docker, docker-machine
* virtualbox
* nodejs

#### Example
```
'use strict'
const {createVms, startVms, createSwarm, stopVms, deleteVms,
	isReady, getVmIp} = require('@pubcore/docker-cluster-test'),
	{deploy} = require('@pubcore/node-docker-build')

//this will lead to 2 virtual machines with name vm1 and vm2
vmSet = {name:'vm', count:2}

createVms(vmSet)
startVms(vmSet)
createSwarm(vmSet)

//helper function to deploy a example service via ssh to the test-swarm
deploy({
	moduleName:resolve(__dirname, '../localhost/config'),
	logPath:resolve(__dirname)
})

//if test-service is ready on vm2, do some-thing, here - for instance - cleanup
isReady({host:getVmIp(vmSet), port:8080}).then(() => {
	
	//clean up
	stopVms(vmSet)
	deleteVms(vmSet)
},
```

#### References
[docker swarm tutorial](https://docs.docker.com/get-started/part4/).









