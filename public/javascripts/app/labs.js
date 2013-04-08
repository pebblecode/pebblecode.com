require([
  "jquery",
  "jquery.isotope"
], function($, isotope) {
  "use strict";

  void(isotope);

  $('.labs-spotlight .project:first-child').addClass('active');
  var $container = $('.projects-list');

  $container.isotope({
    itemSelector : '.project',
    layoutMode : 'masonry'
  });

  $('button.filter').click(function(){
    var selector = $(this).attr('filter');
    $container.isotope({ filter : selector });
    return false;
  });

});