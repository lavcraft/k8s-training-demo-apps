const http = require('http');
const wrap = require('./request-proxy').wrap;

var isReady=false;
var store = {};

const requestListener = function (req, res) {
  req = wrap(req);
  const links = `"_links": { "info": "${req.uri}/info", "500": "${req.uri}/500"  }`;

  if(isReady) {
    console.log(`${req.method} [${req.url}]:`,req.headers);

    if(req.url === '/500'){
      res.writeHead(500, { pod: process.env.HOSTNAME });
      res.end('{"status":"no ok", "name": "spoiled butter" }');
      return;
    }
    if(req.url === '/info'){
      res.writeHead(200, { pod: process.env.HOSTNAME });
      res.end('{"status":"ok", "name": "butter", "info": "swiss quality" }');
      return;
    }
    res.writeHead(200, { pod: process.env.HOSTNAME });
    res.end(`{"status":"ok", "name": "tasty butter", ${links} }`);
  } else {
    console.log('Not ready yet');
    res.writeHead(500);
    res.write(`{"status":"not okay", "name": "butter with bad luck", ${links} }`);
    res.end();
  }
}

const server = http.createServer(requestListener);
server.listen(8080, () => {
  console.log('started')
  setTimeout(() => isReady=true, process.env.TIME_NEEDED_TO_START ?? 4000);
});

consumeMem();

const handler = (signal) => {
  console.info(`Interrupted ${signal}`)
  process.exit(0)
}

process.on('SIGINT', handler);
process.on('SIGTERM', handler);
//process.on('SIGKILL', handler);


function consumeMem() {
  for(let i =0;i < 20000;i++){
    store[i]='Hello world';  
  }
}
