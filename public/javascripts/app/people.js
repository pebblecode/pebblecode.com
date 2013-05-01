/*global window:false */
define([
  "backbone",
  "urlHandler"
], function(Backbone, urlHandler) {
  "use strict";

  var Person = Backbone.Model.extend(),
    People = Backbone.Collection.extend({
      model: Person
    }),
    people = new People(window.PEOPLE); // Init from global


  window.people = people;
});