require([
  "jquery",
  "jquery.scrollTo"
], function($, scrollTo) {

  // Spotlight changes when person is clicked on
  $('.person').click(function(event) {
    var clickTarget = event.target;
    var personLink = $(clickTarget).is("a") ? clickTarget : $(clickTarget).parents("a").first();
    $("#spotlight .person-row").removeClass("active");

    var personIndex = $(personLink).parent().prevAll().length - 1;
    var personRow = $("#spotlight .person-row")[personIndex];
    $(personRow).addClass("active");

    $.scrollTo( $('#spotlight-scroll'), 600);
    event.preventDefault();
  });

});