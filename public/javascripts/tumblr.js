/**
 * Tumblr specific javascript
 */
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
    modernizr: {
      exports: "Modernizr"
    }
  },
  baseUrl: "http://pebblecode-sandbox.herokuapp.com/javascripts",
  paths: {
    shared: "app/shared",

    jquery: "vendor/jquery",
    underscore: "vendor/underscore",
    "underscore.string": "vendor/underscore.string",
    modernizr: "vendor/modernizr",
  }
});

require([
  "modernizr",
  "shared/random-colors",
  "underscore.string"
], function(modernizr, randomColors, _s) {
  "use strict";

  /*
   * Author name replacement - needed because tumblr doesn't have full names
   */
  var tumblrAuthors = {
    thatsinthebook: "Toby Hunt",
    shapeshed: "George Ornbo",
    elpabl0: "Paul Evans",
    sebbo: "Sebastian Nash",
    abutcher: "Alex Butcher",
    tutaktran: "Tak Tran",
    josephjeganathan: "Joseph Jeganathan",
    eyko: "Vincent Martínez",
    markdurrant: "Mark Durrant",
    danielrbradley: "Daniel Bradley",
    mattward: "Matt Ward",
    andreamis1: "Andrea Miskulin",
    akashchopra: "Akash Chopra"
  };

  // Link authors to their relevant people page
  $(".blog-sidebar .author").each(function() {
    var tumblrName = this.innerHTML,
      authorSlug = _s.slugify(tumblrName),
      authorName = tumblrAuthors[authorSlug] || authorSlug;

    // Use localhost for testing, but pebblecode.com for everything else
    var peopleUrlPrefix = (location.hostname === "localhost") ? "http://localhost:7100/people/" : "http://pebblecode.com/people/";
    var authorUrl = peopleUrlPrefix + authorSlug;
    var authorLink = "<a href='" + authorUrl + "'>" + authorName + "</a>";

    // Insert link inside .author
    this.innerHTML = authorLink;
  });
});