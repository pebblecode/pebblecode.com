/*global window:false */
define([
  "underscore",
  "underscore.string",
  "jquery.scrollTo",
  "backbone",
  "urlHandler"
], function(_, _s, scrollTo, Backbone, urlHandler) {
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

  urlHandler.init({
    routes: {
      "people/:person": function(person) {
        function havePersonSlug(slug) {
          return ($("#" + slug).length > 0);
        }

        function selectSlug(slug) {
          $("#spotlight .person-row").removeClass("active");
          $("#" + slug).addClass("active");
        }

        var personSlug = _s.slugify(person);
        if (havePersonSlug(personSlug)) {
          selectSlug(personSlug);
        } else { // No slug available
          removeHash();
        }
      }
    },
    clickElem: ".person",
    postClick: function(elem) {
      $.scrollTo($('#spotlight-scroll'), 600);
    }
  });

  var Person = Backbone.Model.extend(),
    People = Backbone.Collection.extend({
      model: Person
    }),
    people = new People(window.PEOPLE), // Init from global
    PersonView = Backbone.View.extend({
      template: _.template($("#person-template").html()),
      initialize: function(options){
        this.model = options.model;
        this.listenTo(this.model, 'change', this.render);
      },
      destroy: function(){
        delete this.model;
      },
      render: function() {
        var person = this.model;

        this.$el.html(this.template({
          person: person,
          id: _s.slugify(person.get('name')),
          name: person.get('name'),
          title: person.get('title'),
          tumblr_name: person.get('tumblr_name'),
          big_image: "/images/mug-shots/big/" + person.get('image'),
          description: person.get('description'), // TODO: Use markdown
          website: person.get('website'),
          twitter: person.get('twitter'),
          github: person.get('github'),
          linkedin: person.get('linkedin')
        }));
        return this;
      }
    }),
    personView = new PersonView({
      el: $("#spotlight"),
      model: people.first()
    });

  // TODO: Test code
  window.people = people;
  window.personView = personView;
});