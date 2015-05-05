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

}()); // end 'use strict'