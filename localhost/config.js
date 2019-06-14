'use strict'
const getVmIp = require('../js/lib/getVmIp')

module.exports = {
	repository: {
		user:'git', domain:'github.com', scope:'pubcore', name:'docker-cluster-test'
	},
	target:{
		host:{host:getVmIp({name:'vm', n:1}), key:'~/.docker/machine/machines/vm1/id_rsa', user:'docker'},
		home:'/home/docker',
		stackName: 'cluster-test'
	}
}