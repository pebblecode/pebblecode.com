/*global casper:false */

casper.test.comment('Load pre.js');

var utils = {
  baseUrl: "http://localhost:7100/"
};

var paths = {
  homepage: utils.baseUrl,
  labs: utils.baseUrl + "labs",
  people: utils.baseUrl + "people"
};

casper.test.done();