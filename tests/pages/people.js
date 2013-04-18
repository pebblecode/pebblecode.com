/*global casper:false */

casper.test.comment('People');
casper.start(paths.people, function() {

  // Has spotlight scroll element
  this.test.assertExists("#spotlight-scroll");

});

casper.run(function() {
  this.test.done();
});