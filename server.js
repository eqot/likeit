'use strict';

var http = require('http');
var clientHtml = require('fs').readFileSync('index.html');

http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(clientHtml);
}).listen(8080);
