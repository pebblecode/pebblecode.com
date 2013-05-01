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
    personTemplate = _.template($("#person-template").html());

  // TODO: Test code
  window.people = people;
  var person = people.first();
  window.personHtml = personTemplate({
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
  });
});