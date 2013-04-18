/*global casper:false */

casper.test.comment('Homepage');
casper.start(paths.homepage, function() {

  this.test.assertExists("body.page-homepage");

});

casper.run(function() {
  this.test.done();
});