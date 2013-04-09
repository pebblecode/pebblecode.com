define([
  "jquery",
  "jquery.scrollTo",
  "backbone",
  "underscore.string"
], function($, scrollTo, Backbone, _s) {
  "use strict";

  // From http://stackoverflow.com/a/5298684/111884
  function removeHash() {
    var scrollV, scrollH, loc = window.location;

    if ("pushState" in history)
      history.pushState("", document.title, loc.pathname + loc.search);
    else {
      // Prevent scrolling by storing the page's current scroll offset
      scrollV = document.body.scrollTop;
      scrollH = document.body.scrollLeft;

      loc.hash = "";

      // Restore the scroll offset, should be flicker free
      document.body.scrollTop = scrollV;
      document.body.scrollLeft = scrollH;
    }
  }

  function havePersonSlug(slug) {
    return ($("#" + slug).length > 0);
  }

  function selectSlug(slug) {
    $("#spotlight .person-row").removeClass("active");
    $("#" + slug).addClass("active");
    $.scrollTo($('#spotlight-scroll'), 600);
  }

  // Url handling
  var AppRouter = Backbone.Router.extend({
    routes: {
      ":person": "getPerson"
    }
  });
  var appRouter = new AppRouter();

  appRouter.on('route:getPerson', function(person) {
    var personSlug = _s.slugify(person);
    if (havePersonSlug(personSlug)) {
      selectSlug(personSlug);
    } else { // No slug available
      removeHash();
    }
  });

  Backbone.history.start();

  return {
    selectSlug: selectSlug
  };
});