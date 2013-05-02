/*global window:false */
define([
  "underscore",
  "underscore.string",
  "jquery.scrollTo",
  "backbone",
  "urlHandler"
], function(_, _s, scrollTo, Backbone, urlHandler) {
  "use strict";

  var Person = Backbone.Model.extend({
    initialize: function() {
      this.color = this._findColor();
    },

    /**
     * Find colour of the person based on `data-color` attribute of heading
     *
     * @return {String} Colour of person
     */
    _findColor: function() {
      var slug = _s.slugify(this.get('name')),
        color = $(".person[href*='" + slug + "'] h4").attr("data-color");

      return color;
    }
  }),
    People = Backbone.Collection.extend({
      model: Person,
      findBySlug: function findBySlug(slug) {
        return _.find(this.models, function(person) {
          return _s.slugify(person.get('name')) === slug;
        });
      },
      havePersonSlug: function havePersonSlug(slug) {
        return this.findBySlug(slug);
      }
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

      /**
       * Render the person in `this.el`
       *
       * @param color {String} Colour for the person spotlight
       */
      render: function(color) {
        var person = this.model;

        this.$el.html(this.template({
          color: person.color,
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
    });

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
      "people/:person": function(personSlug) {
        function selectSlug(slug) {
          var personView = new PersonView({
            el: $("#spotlight"),
            model: people.findBySlug(slug)
          });
          personView.render();
        }

        if (people.havePersonSlug(personSlug)) {
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
});