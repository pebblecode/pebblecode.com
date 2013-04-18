/*global casper:false */
var url = 'http://localhost:7100/';

casper.test.comment('Homepage');
casper.start(url, function() {

  this.test.assertExists("body.page-homepage");

});

casper.run(function() {
  this.test.done();
});