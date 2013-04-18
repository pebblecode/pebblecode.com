/*global casper:false */

var BASE_URL = 'http://localhost:7100/';

casper.test.comment('go to homepage');

casper.start(BASE_URL, function() {

  var homepage = BASE_URL;

  this.test.assertExists("body.page-homepage");

});

casper.run(function() {
  this.test.done();
});