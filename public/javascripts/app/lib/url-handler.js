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

    if ("pushState" in history) {
      history.pushState("", document.title, loc.pathname + loc.search);
    } else {
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

  // Set up router
  var AppRouter = Backbone.Router.extend({
    routes: {
      "people/:person": "getPerson"
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

  // Routing with person link
  $(document).on("click", ".person", function(event) {
    // Ignore control keys to open link in new window
    if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
      event.preventDefault();
      // Remove initial /
      var url = $(event.currentTarget).attr("href").replace(/^\//, "");
      appRouter.navigate(url, { trigger: true });
    }
  });

  Backbone.history.start({
    pushState: true
  });
});