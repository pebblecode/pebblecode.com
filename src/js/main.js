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

  // sliding contact
  $('.find-us-link').click(function () {
    contactPanel.addClass( 'active' );
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
    $('.address').fadeOut(100);
    $(this).addClass('active');
  });

  // Google Maps: Pan between different Locations
  var marker;
  var map;
  $('.map-nav .london').click(function(){
    changeMarkerPos(51.485672, -0.118554);
    $('.map-addresses .london-address').fadeIn(200);
  });
  $('.map-nav .edinburgh').click(function(){
    changeMarkerPos(55.8959774, -3.296969);
    $('.map-addresses .edinburgh-address').fadeIn(200);
  });
  $('.map-nav .newcastle').click(function(){
    changeMarkerPos(55.0016746, -1.6156206);
    $('.map-addresses .newcastle-address').fadeIn(200);
  });
  $('.map-nav .sofia').click(function(){
    changeMarkerPos(42.6742392, 23.3543577);
    $('.map-addresses .sofia-address').fadeIn(200);
  });
  function initialize() {

    var mapProp = {
        center: new google.maps.LatLng(51.485672, -0.118554),
        zoom: 15,
        panControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: true,
        streetViewControl: false,
        overviewMapControl: false,
        rotateControl: true,
        scrollwheel: false,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    map = new google.maps.Map(document.getElementById("map"), mapProp);

    marker = new google.maps.Marker({
        position: new google.maps.LatLng(51.485672, -0.118554),
        animation: google.maps.Animation.DROP
    });

    marker.setMap(map);
    map.panTo(marker.position);

    google.maps.event.addListener(marker, "click", function () {

    });
}

function changeMarkerPos(lat, lon){
    myLatLng = new google.maps.LatLng(lat, lon)
    marker.setPosition(myLatLng);
    map.panTo(myLatLng);
}
google.maps.event.addDomListener(window, 'load', initialize);
  
});
