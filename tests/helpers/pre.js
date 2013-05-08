/*global casper:false */

casper.test.comment('Load pre.js');

var BASEURL = casper.cli.get('url');
if (BASEURL === "undefined") {
  casper.test.fail("Base url not defined. Use --url to define a url to test on");
}
// Add trailing slash
BASEURL.replace(/\/?$/, '/');

var utils = {
  baseUrl: BASEURL
};

var paths = {
  homepage: utils.baseUrl,
  labs: utils.baseUrl + "labs",
  people: utils.baseUrl + "people",
  "find-us": utils.baseUrl + "find-us"
};

/**
 * Production paths
 *
 * @param  {String} name Name of the url for `paths` key
 * @return {String} Production path
 */
var prodPaths = function(name) {
  return paths[name] + "?prod";
};

casper.test.done();