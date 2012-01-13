/////////////////////////////////////////////////////////////////////////////
// Typekit font element selectors
/////////////////////////////////////////////////////////////////////////////
var font_element_selector = 'h1, h2, h3, h4, .address p, .body .title a, .body h1, .body h2, .body h3, .meta .author, .blog .content #posts .post .body-wrapper .comments-wrapper #dsq-content h3, .blog .content #posts .post .body-wrapper .comments-wrapper .dsq-commenter-name';

$(document).ready(function(){
  

  /////////////////////////////////////////////////////////////////////////////
  // Author name replacement - needed because tumblr doesn't have full names
  /////////////////////////////////////////////////////////////////////////////
  var tumblr_authors = {
    thatsinthebook: "Toby Hunt",
    shapeshed: "George Ornbo",
    elpabl0: "Paul Evans",
    sebbo: "Sebastian Nash",
    abutcher: "Alex Butcher",
    tutaktran: "Tak Tran",
    josephjeganathan: "Joseph Jeganathan",
    eyko: "Vincent Martinez",
    markdurrant: "Mark Durrant",
    danielrbradley: "Daniel Bradley",
    mattward: "Matt Ward"
  };

  jQuery(".blog .meta .author").each(function(i) {
    author = this.innerHTML;
    this.innerHTML = this.innerHTML.replace(author, tumblr_authors[author]||author);
  });
  
  /////////////////////////////////////////////////////////////////////////////
  // Pebble colour selection
  /////////////////////////////////////////////////////////////////////////////
  var colors = ["#e0427b","#419fda","#adca3a", "#f7ae35", "#42b8be", "#a1579c"];
  var color_names = ["pebble_pink","pebble_blue","pebble_green", "pebble_orange", "pebble_aqua", "pebble_purple"];
  
  // Random navigation colour
  var rand = Math.floor(Math.random()*colors.length);
  $('nav').css("background-color", colors[rand]);
  $('.v-space').css("background-color", colors[rand]);
  $('.about-odd').css("border-right","solid red 2px").css("borderColor", colors[rand]);
  
  // Blog post colour - picked based on post id mod with colours array
  if ($(".blog #posts").length > 0) {
    $(this).find(".post").each(function() {
      var post_id_str = $(this).attr("id").replace("post_", "");
      var post_id = parseInt(post_id_str);
      
      var color_class = color_names[post_id % color_names.length];
      $(this).addClass(color_class);
    });
  }
  
  /////////////////////////////////////////////////////////////////////////////
  // Move offset for anchor text on work page, to accomodate for fixed header
  /////////////////////////////////////////////////////////////////////////////
  if ($("body.work-page").length > 0) {
    if (location) {
      var window_hash = window.location.hash;
      if (window_hash.length > 0) {
        var heading_padding = 40;
        var targetOffset = $(".work-page .content " + window_hash).offset().top - $("header nav").height() - heading_padding;
        $('html,body').animate({scrollTop: targetOffset}, 1000);
      }
    }
  }
  
  /////////////////////////////////////////////////////////////////////////////
  // Fancybox elements
  /////////////////////////////////////////////////////////////////////////////
  if ($.fancybox) {
    $(".work-page ul.work-listing li ul.images a").fancybox({
      'overlayShow' : true,
      'hideOnOverlayClick' : true,
      'transitionIn'  : 'fade',
      'transitionOut' : 'fade',
      'titlePosition' : 'inside',
      'titleFormat'   : function(title, currentArray, currentIndex, currentOpts) {
        return '<span id="fancybox-title-inside">' + (title.length ? title + ' image ': 'Image ') + (currentIndex + 1) + ' of ' + currentArray.length + '</span>';
       }
    });
  }
  
  /////////////////////////////////////////////////////////////////////////////
  // Hide typekit fonts initially
  /////////////////////////////////////////////////////////////////////////////
  // Elements requiring font substitution
  $(font_element_selector).each(function() { // Add class to elements that are hidden already
    if ($(this).is(":hidden")) {
      $(this).addClass("ignore_font");
    }
  });
  $(font_element_selector).not('.ignore_font').css('visibility', 'hidden');
  
  // Load typekit
  try {
    Typekit.load({
      active: function() {
        // As soon as the fonts are active, fade in the example
        // Don't fade in browsers that don't do proper opacity, like IE
        if (jQuery.support.opacity) {
          $(font_element_selector).not('.ignore_font').css('visibility', 'visible').hide().fadeIn();
        } else {
          $(font_element_selector).not('.ignore_font').css('visibility', 'visible');
        }
      },
      inactive: function() {
        // If the fonts are inactive, just show the example
        // You can apply fallback styles using the wf-inactive class in your CSS
        $(font_element_selector).not('.ignore_font').css('visibility', 'visible');
      }
    })
  } catch(e) {}  
});

