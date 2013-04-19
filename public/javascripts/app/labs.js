define([
  "jquery",
  "jquery.isotope",
  "jquery.isotope.center"
], function($, isotope, isotopeCenter) {
  "use strict";

  $('.labs-spotlight .project:first-child').addClass('active');
  var $container = $('.projects-list');

  $container.isotope({
    itemSelector: '.project',
    layoutMode: 'masonry'
  });

  $('button.filter').click(function(){
    var selector = $(this).attr('data-filter');
    $container.isotope({ filter : selector });
    $('button.filter').removeClass('active');
    if (!($(this).hasClass('clear-filters'))) {
      $(this).addClass('active');
    }
    return false;
  });

});