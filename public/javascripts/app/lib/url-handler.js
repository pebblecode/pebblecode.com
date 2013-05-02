define([
  "jquery",
  "backbone",
  "underscore.string"
], function($, Backbone, _s) {
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
  }

  // Set up router
  var AppRouter = Backbone.Router.extend({
    initialize: function() {
      return this.bind('route', this._trackPageview);
    },
    routes: {
      "people/:person": "getPerson"
    },
    _trackPageview: function() {
      var url;

      url = Backbone.history.getFragment();
      return _gaq.push(['_trackPageview', "/" + url]);
    },

    getPerson: function(person) {
      var personSlug = _s.slugify(person);
      if (havePersonSlug(personSlug)) {
        selectSlug(personSlug);
      } else { // No slug available
        removeHash();
      }
    }
  });
  var appRouter = new AppRouter();

  var init = function init(args) {
    var clickElem = args.clickElem,
        postClick = args.postClick;

    // Enable pushState for compatible browsers
    var enablePushState = true;
    // Disable for older browsers
    var pushState = !!(enablePushState && window.history && window.history.pushState);
    if (pushState) {
      // Routing with person link
      $(document).on("click", clickElem, function(event) {
        // Ignore control keys to open link in new window
        if (!event.altKey && !event.ctrlKey && !event.metaKey && !event.shiftKey) {
          event.preventDefault();
          // Remove initial /
          var url = $(event.currentTarget).attr("href").replace(/^\//, "");
          appRouter.navigate(url, { trigger: true });

          if (postClick) {
            postClick(event.target);
          }
        }
      });
    } // else link urls force a page refresh
    Backbone.history.start({ pushState: pushState, hashChange: pushState });
  };

  return {
    init: init
  };
});