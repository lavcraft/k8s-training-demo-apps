function wrap(req) {
  const host = req.headers['x-forwarded-host'];
  const proto = req.headers['x-forwarded-proto'];
  const prefix = req.headers['x-forwarded-prefix'];

  const proxy = new Proxy(req, {
    get: function(obj, prop) {
      if(prop === 'uri' && host && proto && prefix) {
        return `${proto}://${host}${prefix}`;
      }
      if(prop === 'headers' && host && proto && prefix) {
        return {
          ...req.headers,
             host,
             proto,
             prefix,
        }
      }
      if(prop in obj) {
        return obj[prop];
      }
    }
  });

  return proxy;
}
// sanity test
const req =  {
  headers: {
    ['x-forwarded-host']: 'my-host',
    ['x-forwarded-proto']: 'https',
    ['x-forwarded-prefix']: '/en',
  }
}

const wrapped = wrap(req);
//console.log(wrapped.headers);

module.exports = {
  wrap,
}
