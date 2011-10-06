
/**
 * Module dependencies.
 */

var express = require('express')
	, force_domain = require('connect-force-domain');

var app; 
if (process.env.NODE_ENV == 'production') { 
	app = module.exports = express.createServer(force_domain('pebblecode.com'));
} else { 
	app = module.exports = express.createServer();
} 

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
//
app.get('/', function(req, res){
  res.render('index', {
    title: 'pebble {code} ..coming soon',
	layout: 'holding.jade'
  });
});

app.get('/home', function(req, res){
  res.render('home', {
    title: 'Home | pebble {code}'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About | pebble {code}'
  });
});

app.get('/work', function(req, res){
  res.render('work', {
    title: 'Work | pebble {code}'
  });
});

app.get('/blog', function(req, res){
  res.render('blog', {
    title: 'Blog | pebble {code}'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(process.env.PORT || 3000);
  console.log("Express server listening on port %d", app.address().port);
}
