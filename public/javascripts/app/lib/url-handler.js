define([
  "jquery",
  "backbone"
], function($, Backbone) {
  "use strict";

  var init = function init(args) {
    var routes = args.routes,
        clickElem = args.clickElem,
        postClick = args.postClick;

    // Set up router
    var AppRouter = Backbone.Router.extend({
      initialize: function() {
        return this.bind('route', this._trackPageview);
      },
      routes: routes,
      _trackPageview: function() {
        var url;

        url = Backbone.history.getFragment();
        return _gaq.push(['_trackPageview', "/" + url]);
      }
    });
    var appRouter = new AppRouter();

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
    /**
     * Initialise url handler
     *
     * @param args {Object} Arguments for initialisation
     *   @param routes {Object} Routes for Backbone.Router
     *   @param clickElem {string} The selector of the element clicked to change the url (location in `href` attribute)
     *   @param [postClick] {function(elem)} Function called after a click
     */
    init: init
  };
});