/**
 * Tumblr specific javascript
 */
function isLocalhost() {
  return (location.hostname === "localhost");
}

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
    },
    highlight: {
      exports: "hljs"
    }
  },
  baseUrl: isLocalhost() ? "/javascripts" : "http://pebblecode-sandbox.herokuapp.com/javascripts",
  paths: {
    shared: "app/shared",

    jquery: "vendor/jquery",
    underscore: "vendor/underscore",
    "underscore.string": "vendor/underscore.string",
    modernizr: "vendor/modernizr",

    highlight: "vendor/highlight/highlight.pack"
  }
});

require([
  "jquery",
  "modernizr",
  "highlight",
  "shared/random-colors",
  "underscore.string"
], function($, modernizr, hljs, randomColors, _s) {
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