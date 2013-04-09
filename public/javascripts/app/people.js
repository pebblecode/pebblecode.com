require([
  "jquery",
  "jquery.scrollTo",
  "urlHandler"
], function($, scrollTo, urlHandler) {
  "use strict";

  // Spotlight changes when person is clicked on
  $('.person').click(function(event) {
    var clickTarget = event.target,
      personLink = $(clickTarget).is("a") ? clickTarget : $(clickTarget).parents("a").first(),
      personSlug = $(personLink).attr("data-person-slug");

    urlHandler.selectSlug(personSlug);
  });
});