$(document).ready(function(){
  var colors = ["#e0427b","#419fda","#adca3a", "#f7ae35", "#42b8be", "#a1579c"];                
  var rand = Math.floor(Math.random()*colors.length);           
  $('nav').css("background-color", colors[rand]);
  
  // Move offset for anchor text, to accomodate for fixed header
  if (location) {
    var window_hash = window.location.hash;
    if (window_hash.length > 0) {
      var heading_padding = 40;
      var targetOffset = $(".work-page .content " + window_hash).offset().top - $("header nav").height() - heading_padding;
      $('html,body').animate({scrollTop: targetOffset}, 1000);
    }
  }
});
