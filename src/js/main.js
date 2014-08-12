/*global $:true, console:true, Handlebars:true, JST:true*/
$(document).ready(function () {

  // element caching
  var homepageHead = $( '.homepage-head' ),
      navBtn = $(' .nav-btn'),
      siteHeader = $('.site-header'),
      contactPanel = $('.contact-panel'),
      colorMe = $('.person, .ppl-text'),
      helpPanel = $('.cta-help-btn, .cta-help');

  navBtn.click(function () {
    siteHeader.toggleClass('expanded');
  });

  $(window).scroll(function () {
    homepageHead.css('background-position', '0 ' + ($(window).scrollTop() - 60) + 'px');
  });

  helpPanel.click( function() {
    helpPanel.toggleClass( 'active' );
  });

  // large screen maps stuff.
  function initialize() {
    var mapOptions = {
      center: new google.maps.LatLng(51.485672, -0.118554),
      zoom: 15,
      scrollwheel: false,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),
      mapOptions);

    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(51.485672, -0.118554),
      map: map,
      title: "Hello World!"
    });
  }

  // sliding contacts
  $('.find-us-link').click(function () {
    if ($(window).width() <= 600) {
      window.location = 'https://maps.google.com/maps?q=pebble+%7Bcode%7D,+Durham+Street,+London,+United+Kingdom&hl=en-US&ll=51.485632,-0.118747&spn=0.011264,0.024312&sll=51.485672,-0.118554&sspn=0.022528,0.048623&oq=pebble+code&t=m&z=16&iwloc=A';
    }
    else {
      initialize();
      contactPanel.addClass( 'active' );
    }
  });

  $('#map-canvas, .site-header').click(function () {
    contactPanel.removeClass( 'active' );
  });

  // people page
  // var colorClasses = ['ppl-c-1', 'ppl-c-2', 'ppl-c-3', 'ppl-c-4'];

  colorMe.each( function () {
    $( this ).addClass( 'ppl-c-' + [ Math.floor( Math.random() * 6 ) + 1 ] );
  });

  // browser stuffs
  if ( !Modernizr.svg ) {
    $('img[src*="svg"]').attr('src', function() {
      return $(this).attr('src').replace('.svg', '.png');
    });
  }

  if( !Modernizr.mq( 'only all' ) ) {
    $( 'html' ).addClass( 'no-mq' );
  }

  // video stuff to deal with IE9
  $('iframe').each(function() {
    var url = $(this).attr("src");
    if ($(this).attr("src").indexOf("?") > 0) {
      $(this).attr({
        "src" : url + "&wmode=transparent",
        "wmode" : "Opaque"
      });
    }
    else {
      $(this).attr({
        "src" : url + "?wmode=transparent",
        "wmode" : "Opaque"
      });
    }
  });

  // contact page
  $('.map-nav a').click(function(){
    $('.map-nav a').removeClass('active');
    $('.map-container').fadeTo(200, 0).css('z-index', '1');
    $(this).addClass('active');
  });
  $('.map-nav .london').click(function(){
    $('.london-map').fadeTo(300, 1).css('z-index', '4');
  });
  $('.map-nav .edinburgh').click(function(){
    $('.edinburgh-map').fadeTo(300, 1).css('z-index', '4');
  });
  $('.map-nav .newcastle').click(function(){
    $('.newcastle-map').fadeTo(300, 1).css('z-index', '4');
  });
  $('.map-nav .sofia').click(function(){
    $('.sofia-map').fadeTo(300, 1).css('z-index', '4');
  });
  
});

// Google Maps
window.onload = function() {

    var mapLondon = {
      center: new google.maps.LatLng(51.485672, -0.118554),
      zoom: 15,
      scrollwheel: false,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("london-map"),
      mapLondon);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(51.485672, -0.118554),
      map: map,
      title: "pebble {code}"
    });

    var mapEdinburgh = {
      center: new google.maps.LatLng(55.8959774, -3.296969),
      zoom: 15,
      scrollwheel: false,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("edinburgh-map"),
      mapEdinburgh);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(55.8959774, -3.296969),
      map: map,
      title: "pebble {code}"
    });

    // Google map: Newcastle
    var mapNewcastle = {
      center: new google.maps.LatLng(55.0016746, -1.6156206),
      zoom: 15,
      scrollwheel: false,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("newcastle-map"),
      mapNewcastle);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(55.0016746, -1.6156206),
      map: map,
      title: "pebble {code}"
    });

    // Google map: Sofia
    var mapSofia = {
      center: new google.maps.LatLng(42.6742392, 23.3543577),
      zoom: 15,
      scrollwheel: false,
      disableDefaultUI: true
    };
    var map = new google.maps.Map(document.getElementById("sofia-map"),
      mapSofia);
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(42.6742392, 23.3543577),
      map: map,
      title: "pebble {code}"
    });
};