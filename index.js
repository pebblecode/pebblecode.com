var express = require("express");
var logfmt = require("logfmt");
var app = express();

var port = process.env.PORT || 8080;
var env = process.env.ENV || "development";

if (env === "staging") {
  var username = process.env.HTTP_USERNAME;
  var password = process.env.HTTP_PASSWORD;
  var requireAuthentication = express.basicAuth(function(user, pass) {
     return (user == username && pass == password);
  },'pebble {code} development area');

  // Protect all pages with authentication
  app.all('*', requireAuthentication);
}

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