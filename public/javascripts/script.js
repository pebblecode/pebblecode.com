$(document).ready(function() {
  /* 
  * Slideshow using http://slidesjs.com/ 
  * play = time for each slide
  */
  $(".slideshow").slides({
    play: 5500,
  });
  
  /* 
  * random colours
  */
  function randOrd() {
    return (Math.round(Math.random())-0.5); 
  }
  
  var colors = [ 'pink', 'green', 'blue', 'orange', 'aqua', 'purple','pink', 'green', 'blue', 'orange', 'aqua', 'purple'];
  
  colors.sort( randOrd );
  $('.background-random').each(function(i, val) {
    $(this).addClass(colors[i]+"-background");
  });
  
  colors.sort( randOrd );
  $('.case-study').each(function(i, val) {
    $("h2, h3",this).addClass(colors[i]);
    $("hr, .img",this).addClass(colors[i]+"-background");
  });
  
  colors.sort( randOrd );
  $('.blog-post').each(function(i, val) {
    $("h2, h3, a",this).addClass(colors[i]);
    $(".img, .comments",this).addClass(colors[i]+"-background");
    $(".blog-content",this).addClass(colors[i]+"-border");
  });
  
  colors.sort( randOrd );
  $('.spotlight').each(function(i, val) {
    $("h2, h3, a",this).addClass(colors[i]);
    $(".img",this).addClass(colors[i]+"-background");
  });
  
  colors.sort( randOrd );
  $('.person').each(function(i, val) {
    $("h4",this).addClass(colors[i]);
    $(".img",this).addClass(colors[i]+"-background");
  });

  colors.sort( randOrd );
  $('.person').each(function(i, val) {
    $("h4",this).addClass(colors[12]);
    $(".img",this).addClass(colors[12]+"-background");
  });

});

