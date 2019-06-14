'use strict'
const getVmIp = require('./getVmIp'),
	{exec} = require('shelljs'),
	swarmInitManager = ({vmId, ip}) =>
		`docker-machine ssh ${vmId} "docker swarm init --advertise-addr ${ip}"`,
	swarmInitWorker = ({token, ip, vmId}) =>
		`docker-machine ssh ${vmId} "docker swarm join --token ${token} ${ip}"`

module.exports = vmSet => {
	var {count, name} = vmSet,
		token = '',
		managerIp = '',
		success = true

	for(var i=1; i<=count; i++){
		if(i===1){
			managerIp = getVmIp({name, n:1})
			var regex = new RegExp('--token ([^ ]+)', 'm'),
				{stdout, code} = exec( swarmInitManager({vmId:`${name}1`, ip:managerIp}) )
			token = (regex.exec(stdout)||[])[1]
			success = (code === 0) && success
		}else{
			success = (exec( swarmInitWorker({token, ip:managerIp, vmId:`${name}${i}`}) ).code === 0) && success
		}
	}

	return success
}