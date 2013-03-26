  // // Set spotlight if there is a url hash of the person
  // function onPeoplePage() {
  //   return location.pathname === "/people";
  // }

  // if (onPeoplePage()) {
  //   var personHash = unescape(location.hash.substring(1));
  //   if (_.contains(_.keys(tumblr_authors), personHash)) {
  //     // Find the hash person
  //     var personContainer = $("#spotlight #" + tumblrCssPrefix + personHash);

  //     if (personContainer.length > 0) {
  //       // Remove all active classes
  //       $("#spotlight .person-row").removeClass("active");
  //       // Set it as active
  //       personContainer.addClass("active");
  //     } else {
  //       // Clear out hash value if it is invalid
  //       location.hash = "";
  //     }
  //   } else {
  //     // Clear out hash value if it is invalid
  //     location.hash = "";
  //   }
  // }

  function onPeoplePage() {
    return location.pathname === "/people";
  }

  if (onPeoplePage()) {
    var AppRouter = Backbone.Router.extend({
        routes: {
          "people/:id": "getPerson"
        }
    });
    // Instantiate the router
    var appRouter = new AppRouter();
    appRouter.on('route:getPerson', function (id) {
        console.log( "Get person " + id);
    });
    // Start Backbone history a necessary step for bookmarkable URL's
    Backbone.history.start({ root: "/people/" });
  }

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