
// Run $ expresso

/**
 * Module dependencies.
 */

var app = require('../app')
  , assert = require('assert');


module.exports = {
  'GET /': function(){
    assert.response(app,
      { url: '/' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>Home | pebble {code}</title>');
      });
  },
  'GET /work': function(){
    assert.response(app,
      { url: '/work' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>Work | pebble {code}</title>');
      });
  },
  'GET /blog': function(){
    assert.response(app,
      { url: '/blog' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>Blog | pebble {code}</title>');
      });
  },
  'GET /about': function(){
    assert.response(app,
      { url: '/about' },
      { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' }},
      function(res){
        assert.includes(res.body, '<title>About | pebble {code}</title>');
      });
  }
};
