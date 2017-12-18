const http = require("http");

const server = http.createServer();
const port = process.argv[2] || 3000;

server.on("request", function (request, response) {
  console.log('=== BEGIN ===');
  console.log(`HTTP ${request.httpVersion} ${request.method} ${request.url}`);

  console.log('HEADERS:');
  Object.getOwnPropertyNames(request.headers).forEach((h) => {
    console.log(`${h}: ${request.headers[h]}`);
  });
  console.log('=== END HEADERS ===');

  request.on('data', (chunk) => {
    console.log('BODY:');
    console.log(chunk.toString());
    console.log('=== END BODY ===');
  });

  response.write('Echo');
  response.end();
});

server.listen(port, function () {
  console.log("Listening on port " + port);
});
