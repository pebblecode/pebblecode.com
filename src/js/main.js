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
  // Map Carousel - first checks if .map-carousel exists then creates carousel
  if ($('.map-carousel').length > 0) {
    $(".map-carousel").tinycarousel({
        axis   : "x",
        start: 0,
        animationTime: 500
        // callback: function(e){
        //   $('.viewport, .overview li').css({'height': ($(e).height() + 10) +'px'});
        // }
      });
    var mapCarousel = $(".map-carousel").data("plugin_tinycarousel");
    $('.map-carousel-nav a').click(function(){
      $('.map-carousel-nav a').removeClass('active');
      $(this).addClass('active');
    });
      $('.map-carousel .london').click(function(){
          mapCarousel.move(0);
          return false;
      });
      $('.map-carousel .edinburgh').click(function(){
          mapCarousel.move(1);
          return false;
      });
      $('.map-carousel .newcastle').click(function(){
          mapCarousel.move(3);
          return false;
      });
      $('.map-carousel .sofia').click(function(){
          mapCarousel.move(4);
          return false;
      });

      // var oSlider = $('.map-carousel');
      // oSlider.tinycarousel({
      // callback: function(element){
      //     element.css({ 'height': 100 });
      //     $('.viewport', oSlider).css({ 'height': 100});
      //   }
      // });
  }
  
});

// Google Maps
window.onload = function() {

  

  // contact page
  // Checks if Map Carousel exists, then gets google maps
  if ($('.map-carousel').length > 0) {

    $('.site-footer').hide();
    
    // Google map: London
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

    // Google map: Edinburgh
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
  }

};