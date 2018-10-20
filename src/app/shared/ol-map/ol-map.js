export function getLatLongFromAddress(address,callback) {
  var geocoder = new google.maps.Geocoder();
  
  if (geocoder) {
      geocoder.geocode({
          'address': address
      }, function (results, status) {
        
          if (status == google.maps.GeocoderStatus.OK) {
              //console.log(results[0]);
              var latLng = {};            
              latLng.lat = results[0].geometry.location.lat();
              latLng.lng = results[0].geometry.location.lng();
              callback(latLng);

          }
      });
  }
}
export function renderMapMultipleMarkers(markers,area) {

  document.getElementById('olMap').innerHTML = null;

 /**
 * Elements that make up the popup.
 */
var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');


/**
 * Add a click handler to hide the popup.
 * @return {boolean} Don't follow the href.
 */
closer.onclick = function() {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};


/**
 * Create an overlay to anchor the popup to the map.
 */
var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250
  }
});


  var iconFeatures = [];
  for (let marker of markers) {
    var iconFeature = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.transform([marker.lng, marker.lat], 'EPSG:4326', 'EPSG:3857')),
      description: marker.description
    });
    iconFeatures.push(iconFeature);
  }

  var iconStyle = new ol.style.Style({
    image: new ol.style.Icon(/** @type {olx.style.IconOptions} */({
      anchor: [0.5, 46],
      anchorXUnits: 'fraction',
      anchorYUnits: 'pixels',
      opacity: 0.75,
      scale: 0.2,
      src: './../../../assets/images/mapmarker.png'
    }))
  });
  console.log(iconFeatures)

  var vectorSource = new ol.source.Vector({
    features: iconFeatures
  });

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: iconStyle
  });

  var map = new ol.Map({
    target: 'olMap',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      }),
      vectorLayer
    ],
    overlays: [overlay],
    view: new ol.View({
      center: ol.proj.fromLonLat([area.lng, area.lat]),
      zoom: area.zoomLevel
    })
  });

  map.on('singleclick', function (evt) {
    var isMarkerExists = false;
    var name = map.forEachFeatureAtPixel(evt.pixel, function (feature) {
      isMarkerExists = true;
      return feature.get('description');
    })

    if(isMarkerExists){
      var coordinate = evt.coordinate;
    content.innerHTML = name;
    overlay.setPosition(coordinate);
    }
    
  });
  map.on('pointermove', function (evt) {
    map.getTargetElement().style.cursor = map.hasFeatureAtPixel(evt.pixel) ? 'pointer' : '';
  });
}