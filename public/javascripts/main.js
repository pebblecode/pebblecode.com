require.config({
  shim: {
    jquery: {
      exports: "$"
    },
    underscore: {
      exports: "_"
    },
    "underscore.string": {
      exports: "_s",
      deps: ["underscore"]
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
  baseUrl: "/javascripts",
  paths: {
    shared: "app/shared",

    jquery: "vendor/jquery",
    underscore: "vendor/underscore",
    "underscore.string": "vendor/underscore.string",
    backbone: "vendor/backbone",
    modernizr: "vendor/modernizr",

    urlHandler: "app/lib/url-handler",

    "jquery.isotope": "vendor/isotope",
    "jquery.scrollTo": "vendor/jquery.scrollTo",
    "jquery.slides": "vendor/jquery.slides"
  }
});

// convert Google Maps into an AMD module
define('gmaps', ['async!http://maps.google.com/maps/api/js?v=3&sensor=false'],
function() {
  "use strict";

  // return the gmaps namespace for brevity
  return window.google.maps;
});

require([
  "modernizr",
  "shared/random-colors"
  //"shared/footer" // Not showing map on all pages right now
], function(modernizr, randomColors) {
  "use strict";
});