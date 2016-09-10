const request = require('request');
const http = require('http');
const url = require('url');

const DOMAIN_VERIFICATION_PATH = '/something';
const DOMAIN_VERIFICATION_RESPONSE = 'something';

var server = http.createServer(function(req, res) {
   parsedUrl = url.parse(req.url);
   if (req.method == 'GET' && parsedUrl.pathname == DOMAIN_VERIFICATION_PATH) {
      return handleDomainVerification(req, res);
   } else if (req.method == 'POST') {
      return handleDriveRequest(req, res);
   }
   res.writeHead(404);
   res.end('Unknown');
});

const port = process.env.PORT || 5000;
server.listen(port, function() {
   console.log('Listening on port ' + port);
});

handleDomainVerification = function(req, res) {
   res.writeHead(200);
   res.end(DOMAIN_VERIFICATION_RESPONSE);
};

handleDriveRequest = function(req, res) {
   var data = [];
   req.on('data', function(chunk) {
      data.push(chunk);
   }).on('end', function() {
      body = Buffer.concat(data).toString();
      console.log(body);
      console.log(req.headers);
      console.log('X-Goog-Resource-State', req.headers['X-Goog-Resource-State']);
      res.writeHead(200);
      res.end('okay');
   });
};