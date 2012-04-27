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

  function randArrayItem(array) {
    var randIndex = Math.floor(Math.random() * array.length);
    return array[randIndex];
  }

  function randArrayItemExcept(array, exceptItem) {
    return randArrayItem(_.without(array, exceptItem));
  }

  var colors = [ 'pink', 'green', 'blue', 'orange', 'aqua', 'purple' ];

  $('.background-random').each(function(i, val) {
    $(this).addClass(randArrayItem(colors)+"-background");
  });

  $('.case-study').each(function(i, val) {
    var randColor = randArrayItem(colors);
    $("h2, h3",this).addClass(randColor);
    $("hr, .img",this).addClass(randColor+"-background");
  });

  $('.blog-post').each(function(i, val) {
    var randColor = randArrayItem(colors);
    $("h2, h3, a",this).addClass(randColor);
    $(".img, .comments a",this).addClass(randColor+"-background");
    $(".blog-content",this).addClass(randColor+"-border");
  });

  $('#spotlight').each(function(i, val) {
    var randColor = randArrayItem(colors);
    $("h2, h3, a",this).addClass(randColor);
    $(".img",this).addClass(randColor+"-background");
  });

  {
    // Don't show same colors next to each other
    var lastColor = colors[0];
    $('.person').each(function(i, val) {
      $("h4",this).addClass(lastColor);
      $(".img",this).addClass(lastColor+"-background");
      lastColor = randArrayItemExcept(colors, lastColor);
    });
  }

  $('.person').click(function(event) {
    var clickTarget = event.target;
    var personLink = $(clickTarget).is("a") ? clickTarget : $(clickTarget).parents("a").first();
    $("#spotlight .person-row").removeClass("active");
    // TODO: show new active person

    console.log(personLink);
    event.preventDefault();
  });

});

