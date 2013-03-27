require([
  "jquery"
], function($) {
  "use strict";

  /*
   * re-order content for mobile
   */

  var width = $(window).width();

  if (width < 650) {
    $(".tricklr h2").insertBefore(".tricklr .frame");
    $(".vistazo h2").insertBefore(".vistazo .frame");
    $("<hr/>").addClass("background-random").insertBefore(".vistazo h2");
  }

});