/*jshint multistr:true*/
require([
  "jquery",
  "underscore",
  "jquery.slides"
], function($, _, slides) {
  "use strict";

  /*
   * Slideshow using http://slidesjs.com/
   * play = time for each slide
   */
  function adjustSlideWidth() {
    var slidesWidth = $(".slides_container").width();
    $(".slides_container li").width(slidesWidth);
  }

  if ($(".slideshow").length > 0) {
    $(".slideshow").removeClass("js-hide");
    $(".slideshow").slides({
      play: 5500
    });

    // Auto resize slide widths dynamically (so you can center images)
    adjustSlideWidth();
    $(window).resize(function() {
      adjustSlideWidth();
    });
  }

  /*
   * Tumblr blog
   */
  function populateRecentPosts(elemSel) {
    var MAX_POSTS = 3;

    var tumblrApiUrl = _.template("http://blog.pebblecode.com/api/read/json?num=<%= maxPosts %>&callback=?");
    var tumblrUrl = tumblrApiUrl({ maxPosts: MAX_POSTS });

    var recentPostTemplate = _.template(" \
      <h2 class='size2'>Latest thoughts</h2> \
      <ul> \
        <% _.each(tumblrPosts, function(post) { %> \
          <li>&#8226;&#160;<a href='<%= post.url %>'><%= post['regular-title'] %></a></li> \
        <% }) %> \
      </ul> \
    ");
    // var recentPost = _.template("<li><a href='<%= url %>'><%= title %></a></li>");
    $.getJSON(tumblrUrl, function(tumblrData) {
      if (tumblrData !== null) {
        var recentPostsHtml = recentPostTemplate({ tumblrPosts: tumblrData.posts });
        $(elemSel).append(recentPostsHtml);
      }
    });
  }
  populateRecentPosts("#recent-posts");

});