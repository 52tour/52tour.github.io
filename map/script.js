function addLayerHome(map){
	var iconFeatures=[];
	  //geometry: new ol.geom.Point(ol.proj.transform([43.9906, 56.3121], 'EPSG:4326', 'EPSG:3857')),
	var iconFeature = new ol.Feature({
	  geometry: new ol.geom.Point(ol.proj.transform([43.977602, 56.3008544], 'EPSG:4326', 'EPSG:3857')),
	  name: 'Нижегородское&nbsp;Бюро&nbsp;Путешествий',
	  more: '<div style=\"text-align:center;\"> <img src=\"./l/all-inclusive.jpg\" width=240 height=160><br><br>603022, Россия, г.&nbsp;Н.Новгород, ул.&nbsp;Маршала Баграмяна,&nbsp;1,&nbsp;123</div>',
	  population: 4000,
	  rainfall: 500
	});
	iconFeatures.push(iconFeature);
	var vectorSource = new ol.source.Vector({
	  features: iconFeatures
	});
	var iconStyle = new ol.style.Style({
	  image: new ol.style.Icon( ({
	    anchor: [0.5, 46],
	    anchorXUnits: 'fraction',
	    anchorYUnits: 'pixels',
	    opacity: 0.75,
	    src: 'l/icon.png'
	  }))
	});
	var vectorLayer2 = new ol.layer.Vector({
	  source: vectorSource,
	  style: iconStyle
	});
map.addLayer(vectorLayer2);
}

if(!home) {
	var iconFeatures=[];
	var iconFeature = new ol.Feature({
	  geometry: new ol.geom.Point(ol.proj.transform(mappoint, 'EPSG:4326', 'EPSG:3857')),
	  name: 'Отель',
	  more: 'Координаты для справки.',
	  population: 4000,
	  rainfall: 500
	});
	iconFeatures.push(iconFeature);
	/*
	var iconFeature1 = new ol.Feature({
	  geometry: new ol.geom.Point(ol.proj.transform([-73.1234, 45.678], 'EPSG:4326',     
	  'EPSG:3857')),
	  name: 'Null Island Two',
	  population: 4001,
	  rainfall: 501
	});
	iconFeatures.push(iconFeature1);
	*/
	var vectorSource = new ol.source.Vector({
	  features: iconFeatures //add an array of features
	});
	var iconStyle = new ol.style.Style({
	  image: new ol.style.Icon(/** @type {olx.style.IconOptions} */ ({
	    anchor: [0.5, 46],
	    anchorXUnits: 'fraction',
	    anchorYUnits: 'pixels',
	    opacity: 0.75,
	    src: 'l/icon!.png'
	  }))
	});
	var vectorLayer2 = new ol.layer.Vector({
	  source: vectorSource,
	  style: iconStyle
	});
}
      window.app = {};
      var app = window.app;
       
app.RotateNorthControl = function(opt_options){

	var options = opt_options || {};

	var button = document.createElement('button');
	button.innerHTML = 'Анталия';

	var this_ = this;
	var handleRotateNorth = function(){
		//this_.getMap().getView().setRotation(0);
		switch (button.innerHTML){
			case 'Анталия':
				button.innerHTML = 'Даламан';
				CenterMap(30.5776749, 36.8978548, 9);
				break;
			case 'Даламан':
				button.innerHTML = 'Россия';
				CenterMap(28.7738165, 36.7791937, 9);
				break;
			case 'Россия':
				button.innerHTML = 'Анталия';
				//CenterMap(43.9884093, 56.311938, 15);
				CenterMap(43.977602, 56.3008544, 15);
				break;
			default:
				button.innerHTML = 'Анталия';
				//CenterMap(43.9884093, 56.311938, 15);
				CenterMap(43.977602, 56.3008544, 15);
				break;
		}
	};

	button.addEventListener('click', handleRotateNorth, false);
	button.addEventListener('touchstart', handleRotateNorth, false);

	var element = document.createElement('div');
	element.className = 'rotate-north ol-control';
	element.appendChild(button);

	ol.control.Control.call(this, {
		element: element,
		target: options.target
	});
};
ol.inherits(app.RotateNorthControl, ol.control.Control);     

function CenterMap(long, lat, zoom) {
	map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
	map.getView().setZoom(zoom);
}

var layer = new ol.layer.Tile({
	source: new ol.source.OSM()
});

var map = new ol.Map({
	controls: ol.control.defaults({
		attributionOptions: /** @type {olx.control.AttributionOptions} */ ({
            //collapsible: false
		})
		}).extend([
			new app.RotateNorthControl()
		]),
	layers: [layer],
	target: 'map',
	view: new ol.View({
		center: ol.proj.transform(mappoint, 'EPSG:4326', 'EPSG:3857'),
		zoom: 15
	})
});
/*
var styles = {
  'Mark3': new ol.style.Style({
	image: new ol.style.Icon(({
		anchor: [0.5, 12],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
    src: 'l/Mark3.png'
  }))
  }),
  'Mark4': new ol.style.Style({
	image: new ol.style.Icon(({
		anchor: [0.5, 12],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
    src: 'l/Mark4.png'
  }))
  }),
  'Mark5': new ol.style.Style({
	image: new ol.style.Icon(({
		anchor: [0.5, 12],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
    src: 'l/Mark5.png'
  }))
  }),
  'Mark7': new ol.style.Style({
	image: new ol.style.Icon(({
		anchor: [0.5, 12],
		anchorXUnits: 'fraction',
		anchorYUnits: 'pixels',
    src: 'l/icon.png'
  }))
  })
};

var styleFunction = function (feature) {
  return styles[feature.get('type')];//.getGeometry().getType()
};

var vectorLayer = new ol.layer.Vector({
	source: new ol.source.Vector({
		projection : 'EPSG:3857',
		url: './points.geojson',
		format: new ol.format.GeoJSON()
	}),
	style: styleFunction
});

map.addLayer(vectorLayer);

var features = {};
var vectorSource = vectorLayer.getSource()
vectorSource.on('change', function(evt){
    var source=evt.target;
    if(source.getState() === 'ready'){ 
		features = source.getFeatures();
    }
});
*/

if(!home) map.addLayer(vectorLayer2);
addLayerHome(map);

var mypop = document.getElementById('mypop');
function showMyPopup(feature){
// #################################################################################
    mypop.innerHTML="<h3>"+feature.get('name')+"</h3>" + feature.get('more');
    
    var coordinates = feature.getGeometry().getCoordinates();
    map.getView().setCenter(coordinates);
    
    popup.setPosition(coordinates);
    
    mypop.style.display = "block";
    PopupShowFull(feature.getGeometry().getCoordinates());
// #################################################################################
}
/*
selectbar = document.getElementById('selectbar');
selectbar.onchange = function() {
	showMyPopup(features[this.value]);
}
function find_hotel_position(){
	str = document.getElementById('inputbar').value;
	if(str.length <3) { alert("короткий запрос"); return; }
	
	selectbar.innerHTML = "";
	var i_finded = -1;
	var i_finded_count = 0;
	
	regex = new RegExp(str,'i');
	
	for (i=0; i<features.length; i++){
		name = features[i].get('name');
		if (regex.test(name)){
			if(i_finded_count == 0) i_finded = i;
			i_finded_count++;
			selectbar.innerHTML += '<option value="'+i+'">'+name+'</option>';
		}
	}
	
	if(i_finded_count > 1) selectbar.style.display = "block"; else selectbar.style.display = "none";
	
	if(i_finded_count == 0) { alert("не найдено"); return; }
	showMyPopup(features[i_finded]);
}
*/

var element = document.getElementById('popup');
var popup = new ol.Overlay({
	element: element,
	positioning: 'bottom-top',
	stopEvent: false
});
map.addOverlay(popup);


function PopupShowFull(coordinate){
	//world
	var center = map.getView().getCenter();
	
	//pixel
	var pixelPosition = map.getPixelFromCoordinate([ coordinate[0], coordinate[1] ]);	
	var mapWidth = $("#map").width();
	var mapHeight = $("#map").height();
	var popoverWidth = $("#mypop").width();
	var popoverHeight = $("#mypop").height();
	
	//click center
	pixelPosition[0] += ( + popoverWidth)/2; //mapWidth
	pixelPosition[1] += ( + popoverHeight)/2; //mapHeight
	newCoordinate = map.getCoordinateFromPixel(pixelPosition);
	map.getView().setCenter(newCoordinate);
	
}

map.on('click', function(evt) {
	var lonlat = ol.proj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326');
	var lon = lonlat[0];
	var lat = lonlat[1];
	$("#statusbar").html(lon+", "+lat)

// display popup on click
	var feature = map.forEachFeatureAtPixel(evt.pixel,
		function(feature) {
			return feature;
		}
	);
	var mypop = document.getElementById('mypop');
	if (feature) {
		showMyPopup(feature);
	} else {
		mypop.innerHTML="";
		mypop.style.display = "none";
	}
});

var target = map.getTarget();
var jTarget = typeof target === "string" ? $("#" + target) : $(target);
// change mouse cursor when over marker
$(map.getViewport()).on('mousemove', function (e) {
	var pixel = map.getEventPixel(e.originalEvent);
	var hit = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
		return true;
	});
	if (hit) {
		jTarget.css("cursor", "pointer");
	} else {
		jTarget.css("cursor", "");
	}
});
