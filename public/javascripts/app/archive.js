/*
 * Archive page javascript
 */
require([
  "jquery"
], function($) {

  function populateArchive(elemSel) {
    var MAX_POSTS = 200;

    var tumblrApiUrl = _.template("http://blog.pebblecode.com/api/read/json?num=<%= maxPosts %>&callback=?");
    var tumblrUrl = tumblrApiUrl({ maxPosts: MAX_POSTS });

    var recentPostTemplate = _.template(" \
      <ul> \
        <% _.each(tumblrPosts, function(post) { %> \
          <li><a href='<%= post.url %>'><%= post['regular-title'] %> <span><%= post.date %></span> </a></li> \
        <% }) %> \
      </ul> \
    ");
    var recentPost = _.template("<li><a href='<%= url %>'><%= title %></a></li>");
    $.getJSON(tumblrUrl, function(tumblrData) {
      if (tumblrData !== null) {
        var recentPostsHtml = recentPostTemplate({ tumblrPosts: tumblrData.posts });
        $(elemSel).append(recentPostsHtml);
      }
    });
  }
  populateArchive("#archive-list");

});