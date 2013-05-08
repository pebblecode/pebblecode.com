/*global casper:false */

casper.test.comment('Find us');
casper.start(prodPaths("find-us"))
  .then(function() {
    this.test.assertVisible("#map", "Map is visible");
  });

casper.run(function() {
  this.test.done();
});