// Javascript for the footer
require([
  "jquery"
], function($) {
  "use strict";

  // footer map stuff
  $("footer").hover(
    function () {
      $(this).css("height", "500px");
      $.scrollTo($('footer'), "max");
    },
    function () {
      $(this).animate({height: "80px"}, 500 );
    }
  );

});