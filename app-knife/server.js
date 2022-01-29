const http = require('http');
const process = require('process')

const requestListener = function (req, res) {
  const butterRequest= http.get({
	  hostname: process.env.CALL_HOST ?? 'app-butter-service',
	  port: 8080,
	  path: '/',
	  agent: false, // Create a new agent just for this one request
      timeout: parseInt(process.env.CALL_TIMEOUT ?? '500'),
	}, (srvResponse) => {

		srvResponse.on('data', (data) => {
			const response=data.toString('utf8');
	            	console.log(response);

			res.writeHead(200);
			const parsedResponse = JSON.parse(response);
			res.end(`{"status":"ok", "name":"shiny knife", "butter": "${parsedResponse.name}"}`);
    	});
  })
  .on('timeout', function () {
    console.log("Probably no butter. Waiting butter is too long...");
	res.writeHead(200);
	res.end('{"status":"ok", "name":"shiny knife", "butter": "butter is too slow"}');
  })
  .on('error', (err) => {
	console.error(err)

	res.writeHead(200);
	res.end('{"status":"ok", "name":"shiny knife", "butter": "not found"}');
  });
 
}

const server = http.createServer(requestListener);
server.listen(8080, () => console.log('started'));

const handler = (signal) => {
  console.info(`Interrupted ${signal}`)
  // process.exit(0)
}

process.on('SIGINT', handler);
process.on('SIGTERM', handler);
//process.on('SIGKILL', handler);
