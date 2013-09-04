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
      deps: ["jquery", "underscore"]
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
    "jquery.validation": {
      deps: ["jquery"],
      exports: "jQuery.fn.validator"
    },
    highlight: {
      exports: "hljs"
    }
  },
  paths: {
    shared: "app/shared",

    jquery: "vendor/jquery",
    underscore: "vendor/underscore",
    "underscore.string": "vendor/underscore.string",
    backbone: "vendor/backbone",

    urlHandler: "app/lib/url-handler",
    gmapsDone: "app/lib/gmapsDone",

    "jquery.isotope": "vendor/isotope",
    "jquery.isotope.center": "vendor/isotope.center",
    "jquery.scrollTo": "vendor/jquery.scrollTo",
    "jquery.slides": "vendor/jquery.slides",
    "jquery.validation": "vendor/jquery.validation",

    highlight: "vendor/highlight/highlight.pack"
  }
});

require([
  "underscore",
  "shared/random-colors",
  "shared/retina"
  //"shared/footer" // Not showing map on all pages right now
], function(_, randomColors, retina) {
  "use strict";

  randomColors.init();
  retina.init();

  // Use mustache symbols in templates
  // To interpolate values from input use: {{ ... }}
  // To evaluate js use: {% ... %}
  _.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g,
    evaluate: /\{\%(.+?)\%\}/g
  };
});