/*global $, document */
/*jshint indent:2 */

require.config({
  shim: {
    underscore: {
      exports: "_"
    },
    backbone: {
      exports: "Backbone",
      deps: ["underscore"]
    },
    "jquery.isotope": {
      deps: ["jquery"],
      exports: "jQuery.fn.isotope"
    },
    "jquery.slides": {
      deps: ["jquery"],
      exports: "jQuery.fn.slides"
    },
    "jquery.qtip": {
      deps: ["jquery"],
      exports: "jQuery.fn.qtip"
    },
    modernizr: {
      exports: "Modernizr"
    }
  },

  paths: {
    shared: "app/shared",

    jquery: "lib/jquery",
    underscore: "lib/underscore",
    backbone: "lib/backbone",
    modernizr: "lib/modernizr",

    "jquery.isotope": "lib/isotope",
    "jquery.scrollTo": "lib/jquery.scrollTo",
    "jquery.slides": "lib/jquery.slides"
  }
});

// convert Google Maps into an AMD module
define('gmaps', ['async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
function(){
  // return the gmaps namespace for brevity
  return window.google.maps;
});

require([
  "modernizr",
  "shared/random-colors",
  "shared/map",
  "shared/footer",
  "shared/mobile"
], function (modernizr, randomColors, map, footer) {

});