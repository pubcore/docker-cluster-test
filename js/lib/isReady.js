'use strict'
const isPortReachable = require('is-port-reachable'),
	wait = () => new Promise((res) => setTimeout(res, 1000)),
	retryPromise = (p, count=1) => p().then(
		ok => ok
			|| count > 0 && wait().then(() => retryPromise(p, count-1))
			|| Promise.reject('NOT_READY'),
		err => err
	)

module.exports = ({host, port}) => retryPromise(
	() => isPortReachable(port, {host, timeout:200}),
	120
)