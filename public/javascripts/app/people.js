require([
  "jquery",
  "jquery.scrollTo",
  "backbone",
  "underscore.string"
], function($, scrollTo, Backbone, _s) {
  "use strict";

  function slug(name) {
    return _s.slugify(name);
  }

  // Url handling
  var AppRouter = Backbone.Router.extend({
    routes: {
      ":person": "getPerson"
    }
  });
  var appRouter = new AppRouter();
  appRouter.on('route:getPerson', function(person) {
    var personSlug = slug(person);
    selectPerson(personSlug);
  });

  Backbone.history.start();

  // Spotlight changes when person is clicked on
  $('.person').click(function(event) {
    var clickTarget = event.target,
      personLink = $(clickTarget).is("a") ? clickTarget : $(clickTarget).parents("a").first(),
      personSlug = $(personLink).attr("data-person-slug");

    selectPerson(personSlug);
  });

  function selectPerson(slug) {
    $("#spotlight .person-row").removeClass("active");
    $("#" + slug).addClass("active");
    $.scrollTo($('#spotlight-scroll'), 600);
  }
});