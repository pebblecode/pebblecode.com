$(document).ready(function(){
  var colors = ["#e0427b","#419fda","#adca3a", "#f7ae35", "#42b8be", "#a1579c"];
  var color_names = ["pebble_pink","pebble_blue","pebble_green", "pebble_orange", "pebble_aqua", "pebble_purple"];
  
  var rand = Math.floor(Math.random()*colors.length);
  $('nav').css("background-color", colors[rand]);
  
  if ($(".blog #posts").length > 0) {
    $(this).find(".post").each(function() {
      var post_id_str = $(this).attr("id").replace("post_", "");
      var post_id = parseInt(post_id_str);
      
      var color_class = color_names[post_id % color_names.length];
      $(this).addClass(color_class);
    });
  }
  
  // Move offset for anchor text on work page, to accomodate for fixed header
  if ($("body.work-page").length > 0) {
    if (location) {
      var window_hash = window.location.hash;
      if (window_hash.length > 0) {
        var heading_padding = 40;
        var targetOffset = $(".work-page .content " + window_hash).offset().top - $("header nav").height() - heading_padding;
        $('html,body').animate({scrollTop: targetOffset}, 1000);
      }
    }
  }
  
});
