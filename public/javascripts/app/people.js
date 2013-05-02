/*global window:false */
define([
  "underscore",
  "underscore.string",
  "backbone",
  "urlHandler"
], function(_, _s, Backbone, urlHandler) {
  "use strict";

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