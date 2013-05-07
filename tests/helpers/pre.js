/*global casper:false */

casper.test.comment('Load pre.js');

var utils = {
  baseUrl: "http://192.168.3.148:7888/"
};

var paths = {
  homepage: utils.baseUrl,
  labs: utils.baseUrl + "labs",
  people: utils.baseUrl + "people"
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