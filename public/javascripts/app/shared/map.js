/**
 * Custom google map styles
 */
define(['gmaps'], function(gmaps) {
  "use strict";

  function load() {

    var styles = [
      {
        featureType: 'water',
        elementType: 'all',
        stylers: [
          { hue: '#0ea2dc' },
          { saturation: 78 },
          { lightness: -40 },
          { visibility: 'on' }
        ]
      },{
        featureType: 'road.arterial',
        elementType: 'all',
        stylers: [
          { hue: '#37bec0' },
          { saturation: -45 },
          { lightness: -37 },
          { visibility: 'on' }
        ]
      },{
        featureType: 'road.highway',
        elementType: 'all',
        stylers: [
          { hue: '#a4ce4e' },
          { saturation: -43 },
          { lightness: -13 },
          { visibility: 'on' }
        ]
      },{
        featureType :"poi.sports_complex",
        elementType: 'all',
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'landscape',
        elementType: 'all',
        stylers: [
          { hue: '#fefcf8' },
          { saturation: 66 },
          { lightness: 86 },
          { visibility: 'on' }
        ]
      },{
        featureType: 'landscape',
        elementType: 'labels',
        stylers: [
          { hue: '#fefcf8' },
          { saturation: 66 },
          { lightness: 86 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi.business',
        elementType: 'labels',
        stylers: [
          { hue: '#000000' },
          { saturation: -100 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi.park',
        elementType: 'all',
        stylers: [
          { hue: '#000000' },
          { saturation: -100 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'road.local',
        elementType: 'all',
        stylers: [
          { color: '#f2f2f2' },
          { visibility: 'simplified' }
        ]
      },{
        featureType: 'road.local',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi.business',
        elementType: 'all',
        stylers: [
          { hue: '#000000' },
          { saturation: -100 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi.attraction',
        elementType: 'all',
        stylers: [
          { hue: '#000000' },
          { saturation: -100 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi.medical',
        elementType: 'all',
        stylers: [
          { hue: '#000000' },
          { saturation: -100 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi.school',
        elementType: 'all',
        stylers: [
          { hue: '#000000' },
          { saturation: -100 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi.government',
        elementType: 'all',
        stylers: [
          { hue: '#000000' },
          { saturation: -100 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'poi.place_of_worship',
        elementType: 'all',
        stylers: [
          { hue: '#000000' },
          { saturation: -100 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'administrative',
        elementType: 'all',
        stylers: [
          { hue: '#000000' },
          { saturation: 0 },
          { lightness: -100 },
          { visibility: 'off' }
        ]
      },{
        featureType: 'transit',
        elementType: 'all',
        stylers: [
          { hue: '#faad40' },
          { saturation: 95 },
          { lightness: -18 },
          { visibility: 'on' }
        ]
      }
    ];

    var styledMap = new gmaps.StyledMapType(styles, {
      name: "Styled Map"
    });

    var point = new gmaps.LatLng(51.485672, -0.118554);

    var myMapOptions = {
      zoom: 15,
      center: point,
      mapTypeId: gmaps.MapTypeId.ROADMAP,
      scrollwheel: false,
      disableDefaultUI: true,
      mapTypeControlOptions: {
        mapTypeIds: [gmaps.MapTypeId.ROADMAP, 'map_style']
      }
    };

    var map = new gmaps.Map(document.getElementById("map"),myMapOptions);

    map.mapTypes.set('map_style', styledMap);
    map.setMapTypeId('map_style');

    var image = new gmaps.MarkerImage(
      'images/map-pin-image.png',
      new gmaps.Size(200,74),
      new gmaps.Point(0,0),
      new gmaps.Point(100,74)
    );

    var shadow = new gmaps.MarkerImage(
      'images/map-pin-shadow.png',
      new gmaps.Size(240,74),
      new gmaps.Point(0,0),
      new gmaps.Point(100,74)
    );

    var shape = {
      coord: [199,0,199,1,199,2,199,3,199,4,199,5,199,6,199,7,199,8,199,9,199,10,199,11,199,12,199,13,199,14,199,15,199,16,199,17,199,18,199,19,199,20,199,21,199,22,199,23,199,24,199,25,199,26,199,27,199,28,199,29,199,30,199,31,199,32,199,33,199,34,199,35,199,36,199,37,199,38,199,39,199,40,199,41,199,42,199,43,199,44,199,45,199,46,199,47,199,48,199,49,199,50,199,51,199,52,199,53,199,54,108,55,107,56,107,57,106,58,106,59,106,60,105,61,105,62,104,63,104,64,103,65,103,66,103,67,102,68,102,69,101,70,101,71,100,72,100,73,99,73,99,72,98,71,98,70,98,69,97,68,97,67,96,66,96,65,95,64,95,63,95,62,94,61,94,60,93,59,93,58,93,57,92,56,92,55,0,54,0,53,0,52,0,51,0,50,0,49,0,48,0,47,0,46,0,45,0,44,0,43,0,42,0,41,0,40,0,39,0,38,0,37,0,36,0,35,0,34,0,33,0,32,0,31,0,30,0,29,0,28,0,27,0,26,0,25,0,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,0,2,0,1,0,0,199,0],
      type: 'poly'
    };

    new gmaps.Marker({
      draggable: false,
      icon: image,
      shadow: shadow,
      shape: shape,
      map: map,
      position: point
    });
  }

  load();
});