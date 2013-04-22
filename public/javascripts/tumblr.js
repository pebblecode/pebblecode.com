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
    highlight: {
      exports: "hljs"
    }
  },
  paths: {
    shared: "app/shared",

    jquery: "vendor/jquery",
    underscore: "vendor/underscore",
    "underscore.string": "vendor/underscore.string",

    highlight: "vendor/highlight/highlight.pack"
  }
});

require([
  "jquery",
  "highlight",
  "shared/random-colors",
  "underscore.string"
], function($, hljs, randomColors, _s) {
  "use strict";

  function isLocalhost() {
    return (location.hostname === "localhost");
  }

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
    wardm: "Matt Ward",
    andreamis1: "Andrea Miskulin",
    akashchopra: "Akash Chopra",
    simonhdickson: "Simon Dickson",
    tsquires10: "Tom Squires",
    jameswallacepebble: "James Wallace",
    nbevans: "Nathan Evans",
    andypebble: "Andy Wardle",
    svnlto: "Sven Lito"
  };

  // Link authors to their relevant people page
  $(".blog-sidebar .author").each(function() {
    var tumblrName = this.innerHTML,
      authorName = tumblrAuthors[tumblrName] || tumblrName,
      authorSlug = _s.slugify(authorName);

    // Use localhost for testing, but pebblecode.com for everything else
    var peopleUrlPrefix = isLocalhost() ? "http://localhost:7100/people/" : "http://pebblecode.com/people/";
    var authorUrl = peopleUrlPrefix + authorSlug;
    var authorLink = "<a href='" + authorUrl + "'>" + authorName + "</a>";

    // Insert link inside .author
    this.innerHTML = authorLink;
  });

  // Initialise random colours
  randomColors.init();

  // Initialise syntax highlighting
  hljs.initHighlighting();
});