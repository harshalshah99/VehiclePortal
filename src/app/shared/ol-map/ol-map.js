export function renderMap(lat,lng){
  document.getElementById('olMap').innerHTML = null;
	var iconFeature = new ol.Feature({
  geometry: new ol.geom.Point(ol.proj.transform([lat,lng], 'EPSG:4326', 'EPSG:3857'))
});


var iconStyle = new ol.style.Style({
  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	 
    opacity: 0.8,
    src: './../../../assets/images/mapmarker.png',
	scale: 0.2
  }))
});


var vectorSource = new ol.source.Vector({
  features: [iconFeature]
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
        view: new ol.View({
          center: ol.proj.fromLonLat([lat,lng]),
          zoom: 10
        })
      });
}