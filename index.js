var port = process.env.PORT || 8080;
var express = require("express");
var logfmt = require("logfmt");
var app = express();

app.use(logfmt.requestLogger());

app.use(express.static(__dirname + '/dist'));
app.use(express.errorHandler({
  dumpExceptions: true,
  showStack: true
}));

var port = Number(port);
app.listen(port, function() {
  console.log("Listening on " + port);
});