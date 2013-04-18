/*global casper:false */
var url = 'http://localhost:7100/people';

casper.test.comment('People');
casper.start(url, function() {

  // Has spotlight scroll element
  this.test.assertExists("#spotlight-scroll");

});

casper.run(function() {
  this.test.done();
});