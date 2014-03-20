var express = require("express");
var logfmt = require("logfmt");
var app = express();
var distFolder = __dirname + '/dist';

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

app.use(express.static(distFolder));
app.use(express.errorHandler({
  dumpExceptions: true,
  showStack: true
}));
app.engine('html', require('ejs').renderFile);

// Simple processing of pages
// Mainly to remove .html extension
app.get('/:page', function(req, res) {
  var page = req.param('page');

  if (page) {
    var pageFile = page + '.html';
    var path = distFolder + "/" + pageFile;
    res.render(path);
  } else {
    throw "Can't find page: " + page;
  }
});

var port = Number(port);
app.listen(port, function() {
  console.log("Listening on " + port);
});