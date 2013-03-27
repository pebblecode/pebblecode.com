/*
 * Tumblr specific javscript
 */
require([
  "jquery"
], function($) {

  /*
   * Author name replacement - needed because tumblr doesn't have full names
   */
  var tumblr_authors = {
    thatsinthebook: "Toby Hunt",
    shapeshed: "George Ornbo",
    elpabl0: "Paul Evans",
    sebbo: "Sebastian Nash",
    abutcher: "Alex Butcher",
    tutaktran: "Tak Tran",
    josephjeganathan: "Joseph Jeganathan",
    eyko: "Vincent Mart&iacute;nez",
    markdurrant: "Mark Durrant",
    danielrbradley: "Daniel Bradley",
    mattward: "Matt Ward",
    andreamis1: "Andrea Miskulin",
    akashchopra: "Akash Chopra"
  };
  var tumblrCssPrefix = "tumblr-";

  // Link authors to their relevant people page
  $(".blog-sidebar .author").each(function(i) {
    var authorId = this.innerHTML;
    var authorName = tumblr_authors[authorId] || authorId;

    // Use localhost for testing, but pebblecode.com for everything else
    var peopleUrlPrefix = (location.hostname === "localhost") ? "http://localhost:7100/people#" : "http://pebblecode.com/people#";
    var authorUrl = peopleUrlPrefix + authorId;
    var authorLink = "<a href='" + authorUrl + "'>" + authorName + "</a>";

    // Insert link inside .author
    this.innerHTML = authorLink;
  });

});