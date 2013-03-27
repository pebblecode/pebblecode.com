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
  "jquery",
  "underscore",
  "jquery.scrollTo",
  "modernizr",
  "shared/random-colors",
  "shared/map",
  "shared/footer"
], function ($, _, scrollTo, modernizr, randomColors, map, footer) {
  "use strict";

  $(document).ready(function() {
    // Recruitment console message
    // if (!window.console) console = {};
    // console.warn = console.warn || function(){};

    //console.warn("We can see your curious, how about a job?");

    /*
    * re-order content for mobile
    */

    var width = $(window).width();

    if (width < 650) {
      $(".tricklr h2").insertBefore(".tricklr .frame");
      $(".vistazo h2").insertBefore(".vistazo .frame");
      $("<hr/>").addClass("background-random").insertBefore(".vistazo h2");
    }
  });
});