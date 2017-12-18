const http = require("http");

const argsSplit = typeof process.argv[2] === 'string' ? process.argv[2].split(':') : [];
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});
console.log(argsSplit[0], argsSplit[1])
const hostname = argsSplit[0] || 'localhost';
const port = argsSplit[1] || 3000;

const postData = JSON.stringify({
  'msg': 'Hello World!'
});

const options = {
  hostname: hostname,
  port: port,
  path: '/',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const request = http.request(options, response => {
  console.log('=== BEGIN ===');
  console.log(`STATUS: ${response.statusCode}`);
  console.log();
  console.log(`HEADERS:`);
  Object.getOwnPropertyNames(response.headers).forEach((h) => {
    console.log(`${h}: ${response.headers[h]}`);
  });
  console.log();
  response.setEncoding('utf8');
  response.on('data', (chunk) => {
    console.log(`BODY: ${chunk}`);
  });
  response.on('end', () => {
    console.log('=== END ===');
  });
});

request.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

// write data to request body
request.write(postData);
request.end();
