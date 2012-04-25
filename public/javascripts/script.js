$(document).ready(function() {
  /*
  * Slideshow using http://slidesjs.com/
  * play = time for each slide
  */
  if ($(".slideshow").length > 0) {
    $(".slideshow").slides({
      play: 5500,
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
    $(".img, .comments a",this).addClass(colors[i]+"-background");
    $(".blog-content",this).addClass(colors[i]+"-border");
  });
  
  colors.sort( randOrd );
  $('#spotlight').each(function(i, val) {
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

  $('.person').click(function(event) {
    var clickTarget = event.target;
    var personLink = $(clickTarget).is("a") ? clickTarget : $(clickTarget).parents("a").first();
    $("#spotlight .person-row").removeClass("active");
    // TODO: show new active person

    console.log(personLink);
    event.preventDefault();
  });

});

