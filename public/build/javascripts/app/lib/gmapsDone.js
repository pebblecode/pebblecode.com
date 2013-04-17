/*global $:false, window:false */

/**
 * Load google maps asynchonously and return a function
 * to wrap around a callback function for when google
 * maps finishes loading.
 *
 * Note: need to load jQuery 1.5+ before this module
 * is loaded.
 *
 * Usage:
 *
 *     define(["gmapsDone"], function(gmapsDone) {
 *       function load() {
 *         // Do something
 *       }
 *       gmapsDone(load);
 *     });
 *
 * @return {Function} function to wrap a callback
 * function for when google maps finishes loading
 */
window._mapsLoaded = $.Deferred();
window.gmapsLoaded = function() {
  delete window.gmapsLoaded;
  _mapsLoaded.resolve();
};

define(["http://maps.google.com/maps/api/js?v=3&sensor=false&callback=gmapsLoaded"], function(gmaps) {
  

  return window._mapsLoaded.done;
});