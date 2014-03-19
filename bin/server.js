"use strict";

var nodeStatic = require('node-static');

var file = new(nodeStatic.Server)('./dist'),
  port = process.env.PORT || 8080;

console.log("Server started on http://localhost:" + port);

require('http').createServer(function(request, response) {
  file.serve(request, response, function(err, res) {
    if (err) {
      response.writeHead(err.status, err.headers);
      response.end();
    }
  });
}).listen(port);