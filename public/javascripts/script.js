$(document).ready(function() {
  /*
  * Slideshow using http://slidesjs.com/
  * play = time for each slide
  */
  function adjustSlideWidth() {
    var slidesWidth = $(".slides_container").width();
    $(".slides_container li").width(slidesWidth);
  }
  if ($(".slideshow").length > 0) {
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
  * re-order content for mobile
  */

  var width = $(window).width();

  if(width < 650) {
    $(".case-study:nth-child(3) .frame").insertAfter(".case-study:nth-child(3) p");
    $(".case-study:nth-child(7) .frame").insertAfter(".case-study:nth-child(7) p");
    $(".tricklr h2").insertBefore(".tricklr .frame");
    $(".vistazo h2").insertBefore(".vistazo .frame");
    $("<hr/>").addClass("background-random").insertBefore(".tricklr h2, .vistazo h2");
  };

  /*
  * random colours
  */

  var COLORS = [ 'pink', 'green', 'blue', 'orange', 'aqua', 'purple' ];
  var LAST_COLOR = COLORS[0];

  // Find random colors, without having the same colors after another
  function randColors(elem, funct) {
    $(elem).each(function(i, val) {
      funct(this, LAST_COLOR);
      LAST_COLOR = randArrayItemExcept(COLORS, LAST_COLOR);
    });
  }

  function randArrayItem(array) {
    var randIndex = Math.floor(Math.random() * array.length);
    return array[randIndex];
  }

  function randArrayItemExcept(array, exceptItem) {
    return randArrayItem(_.without(array, exceptItem));
  }

  randColors('.background-random', function(obj, randColor) {
    $(obj).addClass(randColor + "-background");
  });

  randColors('.case-study', function(obj, randColor) {
    $("h2, h3", obj).addClass(randColor);
    $("hr, .img", obj).addClass(randColor + "-background");
  });

  randColors('.blog-post', function(obj, randColor) {
    $("h2, h3, a", obj).addClass(randColor);
    $(".img, .comments a", obj).addClass(randColor + "-background");
    $(".blog-content", obj).addClass(randColor + "-border");
  });

  randColors('.person', function(obj, randColor) {
    $("h4",obj).addClass(randColor);
    $(".img",obj).addClass(randColor + "-background");

    // Color spotlight person row the same
    var personIndex = $(obj).parent().prevAll().length;
    var spotlightPerson = $("#spotlight .person-row")[personIndex];
    $(spotlightPerson).find("h2, h3, a").addClass(randColor);
    $(spotlightPerson).find(".img").addClass(randColor + "-background");
  });

  $('.person').click(function(event) {
    var clickTarget = event.target;
    var personLink = $(clickTarget).is("a") ? clickTarget : $(clickTarget).parents("a").first();
    $("#spotlight .person-row").removeClass("active");

    var personIndex = $(personLink).parent().prevAll().length;
    var personRow = $("#spotlight .person-row")[personIndex];
    $(personRow).addClass("active");

    $.scrollTo( $('#spotlight'), 600);
    event.preventDefault();
  });

  /*
  * Tumblr blog
  */
  function populateRecentPosts(elemSel) {
    var MAX_POSTS = 3;

    var tumblrApiUrl = _.template("http://blog.pebblecode.com/api/read/json?num=<%= maxPosts %>&callback=?");
    var tumblrUrl = tumblrApiUrl({ maxPosts: MAX_POSTS });

    var recentPostTemplate = _.template(" \
      <h2 class='size2'>Recent blog posts</h2> \
      <ul> \
        <% _.each(tumblrPosts, function(post) { %> \
          <li><a href='<%= post.url %>'><%= post['regular-title'] %></a></li> \
        <% }) %> \
      </ul> \
    ");
    var recentPost = _.template("<li><a href='<%= url %>'><%= title %></a></li>");
    $.getJSON(tumblrUrl, function(tumblrData) {
      if (tumblrData != null) {
        var recentPostsHtml = recentPostTemplate({ tumblrPosts: tumblrData.posts })
        $(elemSel).append(recentPostsHtml);
      }
    });
  }
  populateRecentPosts("#recent-posts");
});

