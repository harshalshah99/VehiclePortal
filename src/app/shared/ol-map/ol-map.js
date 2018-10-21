export function getLatLongFromAddress(address,callback) {
  
  var url = encodeURI("https://nominatim.openstreetmap.org/?format=json&addressdetails=1&q=" + address + "&format=json&limit=1");

      $.get(url, function(data, status){
          callback(data);      
    });

}
export function renderMapMultipleMarkers(markers,area) {

  document.getElementById('olMap').innerHTML = `<div id="popup" class="ol-popup">
  <a href="#" id="popup-closer" class="ol-popup-closer"></a>
  <div id="popup-content"></div>
 </div>
 <style>
 .map {
  height: 450px;
  width: 100%;
  }
  .ol-popup {
  position: absolute;
  background-color: white;
  -webkit-filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  filter: drop-shadow(0 1px 4px rgba(0,0,0,0.2));
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #cccccc;
  bottom: 12px;
  left: -50px;
  min-width: 150px;
  }
  .ol-popup:after, .ol-popup:before {
  top: 100%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  }
  .ol-popup:after {
  border-top-color: white;
  border-width: 10px;
  left: 48px;
  margin-left: -10px;
  }
  .ol-popup:before {
  border-top-color: #cccccc;
  border-width: 11px;
  left: 48px;
  margin-left: -11px;
  }
  .ol-popup-closer {
  text-decoration: none;
  position: absolute;
  top: 2px;
  right: 8px;
  }
  .ol-popup-closer:after {
  content: "✖";
  }
 </style>
 
 `;

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