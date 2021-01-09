
/**/
// создаем массив точек
var iconFeatures=[];

var iconFeature = new ol.Feature({
	geometry: new ol.geom.Point(ol.proj.transform([30.5776749, 36.8978548], 'EPSG:4326', 'EPSG:3857')),
	name: 'Анталия, встречай меня! <img src="1.jpg">Obviously, this could be more elegantly handled by putting all of the ol.Feature creation inside a loop based on some data source, but I hope this demonstrates the approach. Note, also, that you can apply a style to the ol.layer.Vector so that it will be applied to all features being added to the layer, rather than having to set the style on individual features, assuming you want them to be the same, obviously.',
	population: 4000, // +1
	rainfall: 500
});

iconFeatures.push(iconFeature);

var vectorSource = new ol.source.Vector({
	features: iconFeatures
});

//определяем стили


var iconStyle = new ol.style.Style({
	image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
		anchor: [0.5, 46],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
    src: 'https://openlayers.org/en/v3.20.0/examples/data/icon.png'
  }))
});

iconFeature.setStyle(iconStyle);


var vectorLayer = new ol.layer.Vector({
  source: vectorSource,
//  style: iconStyle
});

map.addLayer(vectorLayer);
/*
*/


/*
// change mouse cursor when over marker
map.on('pointermove', function(e) {
  if (e.dragging) {
    $(element).popover('destroy');
    return;
  }
  var pixel = map.getEventPixel(e.originalEvent);
  var hit = map.hasFeatureAtPixel(pixel);
  //map.getTarget().style.cursor = hit ? 'pointer' : '';
});
*/



