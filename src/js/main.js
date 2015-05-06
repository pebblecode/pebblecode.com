(function () { 'use strict';

  // Mobile nav
  var gblHeadBtn = $( '.gbl-head-btn');
  var gblHeadNav = $( '.gbl-head-nav');
  gblHeadBtn.click( function() {
    $(this).toggleClass( 'active' );
    gblHeadNav.toggleClass( 'active' );
  });

  // Tabs
  var tabHeadItem = $( '.tab-head-item' );
  var tabContent = $( '.tab-content' );
  tabHeadItem.click( function() {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
    var tabID = $(this).data('tab-id');
    $('#' + tabID).siblings( '.tab-content' ).removeClass('active');
    $('#' + tabID).addClass('active');
  });

  // Change services bg colour on scroll
  function servicesBG() {
    var windowTop = $(window).scrollTop();
    var servicesStrategy = $( '#servicesStrategy' ).offset().top - 250;
    var servicesHacking = $( '#servicesHacking' ).offset().top - 250;
    var servicesUX = $( '#servicesUX' ).offset().top - 250;
    var servicesUXdesign = $( '#servicesUXdesign' ).offset().top - 250;
    var servicesDesign = $( '#servicesDesign' ).offset().top - 250;
    var servicesAgile = $( '#servicesAgile' ).offset().top - 250;
    var servicesTests = $( '#servicesTests' ).offset().top - 250;
    var servicesCollab = $( '#servicesCollab' ).offset().top - 250;

    if ( windowTop > servicesStrategy  ){
      $( '.services-container' ).css({ 'background-color' : '#9b5ca4' });
    } if ( windowTop > servicesHacking ) {
      $( '.services-container' ).css({ 'background-color' : '#ed4f7e' });
    } if ( windowTop > servicesUX ) {
      $( '.services-container' ).css({ 'background-color' : '#0ea2dc' });
    } if ( windowTop > servicesUXdesign ) {
      $( '.services-container' ).css({ 'background-color' : '#37bec0' });
    } if ( windowTop > servicesDesign ) {
      $( '.services-container' ).css({ 'background-color' : '#a4ce4e' });
    } if ( windowTop > servicesAgile ) {
      $( '.services-container' ).css({ 'background-color' : '#faad40' });
    } if ( windowTop > servicesTests ) {
      $( '.services-container' ).css({ 'background-color' : '#9b5ca4' });
    } if ( windowTop > servicesCollab ) {
      $( '.services-container' ).css({ 'background-color' : '#ed4f7e' });
    }
  }
  $(function() {
    $(window).scroll(servicesBG);
    servicesBG();
  });

}()); // end 'use strict'