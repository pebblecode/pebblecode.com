/*global casper:false */

casper.test.comment('Labs');
casper.start(paths.labs, function() {

  this.test.assertExists("body.page-labs");

});

casper.run(function() {
  this.test.done();
});
