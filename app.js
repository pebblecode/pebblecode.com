
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
  res.render('home', {
    title: 'Home | pebble {code}',
    body_class: 'home-page'
  });
});

app.get('/about', function(req, res){
  res.render('about', {
    title: 'About | pebble {code}',
    body_class: 'about-page'
  });
});

app.get('/work', function(req, res){
  res.render('work', {
    title: 'Work | pebble {code}',
    body_class: 'work-page'
  });
});

app.get('/blog', function(req, res){
  res.render('blog', {
    title: 'Blog | pebble {code}',
    body_class: 'blog-page'
  });
});

// Only listen on $ node app.js

if (!module.parent) {
  app.listen(process.env.PORT || 3000);
  console.log("Express server listening on port %d", app.address().port);
}
