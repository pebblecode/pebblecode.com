require([
  "jquery",
  "jquery.validator"
], function($, jValidator) {
  "use strict";

  void(jValidator);

  /*
   * Pebble's good code
   */
  if ($.validator) {
    var countWords = function(s) {
      s = s.replace(/(^\s*)|(\s*$)/gi,"");
      s = s.replace(/[ ]{2,}/gi," ");
      s = s.replace(/\n /,"\n");
      return s.split(' ').length;
    };

    $.validator.addMethod("lessThan150Words", function(value, element) {
      return this.optional(element) || (countWords(value) <= 150);
    }, "Please write less than 150 words.");

    $("#ss-form").validate();
  }
});