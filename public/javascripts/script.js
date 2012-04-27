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
    $(obj).addClass(randArrayItem(COLORS)+"-background");
  });

  randColors('.case-study', function(obj, randColor) {
    $("h2, h3", obj).addClass(randColor);
    $("hr, .img", obj).addClass(randColor+"-background");
  });

  randColors('.blog-post', function(obj, randColor) {
    $("h2, h3, a", obj).addClass(randColor);
    $(".img, .comments a", obj).addClass(randColor+"-background");
    $(".blog-content", obj).addClass(randColor+"-border");
  });

  randColors('#spotlight', function(obj, randColor) {
    $("h2, h3, a", obj).addClass(randColor);
    $(".img", obj).addClass(randColor+"-background");
  });

  randColors('.person', function(obj, randColor) {
    $("h4",obj).addClass(randColor);
    $(".img",obj).addClass(randColor+"-background");
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

