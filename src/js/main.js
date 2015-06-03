(function () {'use strict';

  // Mobile nav
  var gblHeadBtn = $('.gbl-head-btn');
  var gblHeadNav = $('.gbl-head-nav');
  gblHeadBtn.click( function() {
    $(this).toggleClass('active');
    gblHeadNav.toggleClass('active');
  });

  // Tabs
  var tabHeadItem = $('.tab-head-item');
  var tabContent = $('.tab-content');
  tabHeadItem.click( function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var tabID = $(this).data('tab-id');
    $('#' + tabID).siblings('.tab-content').removeClass('active');
    $('#' + tabID).addClass('active');
  });

  // Change services bg colour on scroll
  var servicesContainer = $('.services-container');
  function servicesBG() {
    var windowTop = $(window).scrollTop();
    var servicesStrategy = $('#servicesStrategy').offset().top - 200;
    var servicesHacking = $('#servicesHacking').offset().top - 200;
    var servicesUX = $('#servicesUX').offset().top - 200;
    var servicesUXdesign = $('#servicesUXdesign').offset().top - 200;
    var servicesDesign = $('#servicesDesign').offset().top - 200;
    var servicesAgile = $('#servicesAgile').offset().top - 200;
    var servicesTests = $('#servicesTests').offset().top - 200;
    var servicesCollab = $('#servicesCollab').offset().top - 200;
    if ( windowTop > servicesStrategy  ){
      servicesContainer.css({'background-color':'#9b5ca4' });
    } if ( windowTop > servicesHacking ) {
      servicesContainer.css({'background-color':'#ed4f7e' });
    } if ( windowTop > servicesUX ) {
      servicesContainer.css({'background-color':'#0ea2dc' });
    } if ( windowTop > servicesUXdesign ) {
      servicesContainer.css({'background-color':'#37bec0' });
    } if ( windowTop > servicesDesign ) {
      servicesContainer.css({'background-color':'#a4ce4e' });
    } if ( windowTop > servicesAgile ) {
      servicesContainer.css({'background-color':'#faad40' });
    } if ( windowTop > servicesTests ) {
      servicesContainer.css({'background-color':'#9b5ca4' });
    } if ( windowTop > servicesCollab ) {
      servicesContainer.css({'background-color':'#ed4f7e' });
    }
  }
  if ($( servicesContainer ).length > 0) { 
    $(function() {
      $(window).scroll(servicesBG);
      servicesBG();
    });
  }

  // Google Maps: Pan between different Locations
  $('#londonBtn').click( function() {
    changeMarkerPos(51.485672, -0.118554);
  });
  $('#sofiaBtn').click(function(){
    changeMarkerPos(42.6742392, 23.3543577);
  });

  var marker;
  var map;
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
    myLatLng = new google.maps.LatLng(lat, lon);
    marker.setPosition(myLatLng);
    map.panTo(myLatLng);
  }

  if ($('#map').length) {
    google.maps.event.addDomListener(window, 'load', initialize);
  }

}()); // end 'use strict'