/*global casper:false */

casper.test.comment('People');
casper.start(prodPaths("people"))
  .then(function() {
    this.test.comment("Clicking on person link");

    this.click(".person[href='/people/toby-hunt']");
    this.test.assertUrlMatch(/\/people\/toby-hunt/, "Changes url");
    this.test.assertVisible("#spotlight-scroll", "Scrolls to #spotlight-scroll");
    this.test.assertSelectorExists(".person-row img[src='/images/mug-shots/big/toby.png']", "Changes image (" + casper.echo(this.getHTML('.person-row img', true)) + ")");
  });

casper.run(function() {
  this.test.done();
});