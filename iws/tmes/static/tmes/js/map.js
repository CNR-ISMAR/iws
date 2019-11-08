var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

//compute date in YYYYMMDD format
var rightNow = new Date();
var todayString = rightNow.toISOString().slice(0,10).replace(/-/g,"");
var newdate = new Date();
newdate.setDate(newdate.getDate() + 1);

var dd = newdate.getDate();
var mm = newdate.getMonth() + 1;
var y = newdate.getFullYear();

var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var tomorrowString = newdate.toISOString().slice(0,10).replace(/-/g,"");

var map = L.map('map', {
    zoom: 6,
    fullscreenControl: true,
    timeDimensionControl: true,
    timeDimensionControlOptions: {
        position: 'bottomleft',
        playerOptions: {
            transitionTime: 1000,
        }
    },
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: rightNow.toISOString().slice(0,10) + "/" + tomorrow.toISOString().slice(0,10),
        period: "PT1H",
        //currentTime: Date.parse("2018-10-29T00:00:00.000Z")
        currentTime: rightNow
    },
    center: [42.10, 17.90]
});

/*colorscale ranges  
* wsh 0-8 wsh-std 0-2
* sea-level (cm) -80 +80 dev std 0-40
*
*/



var tmes_wl_WMS = "https://iws.ismar.cnr.it/thredds/wms/tmes/TMES_sea_level_" + todayString + ".nc";
//sea level
var tmesWaterLevel = L.nonTiledLayer.wms(tmes_wl_WMS, {
    layers: 'sea_level-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-0.8,0.8',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 100,
    styles: 'boxfill/alg2'
        // styles: 'areafill/scb_greens'
});
var tmesWaterLevel_std = L.nonTiledLayer.wms(tmes_wl_WMS, {
    layers: 'sea_level-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,0.4',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/redblue'
});


var tmes_wv_WMS = "https://iws.ismar.cnr.it/thredds/wms/tmes/TMES_waves_" + todayString  + ".nc";

//wave significant height
var tmesWavesSignificantHeight = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wsh-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,8',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/occam'
});
var tmesWavesSignificantHeight_std = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wsh-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,2',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,   
    markerclipping: true, 
    styles: 'boxfill/occam'
});
//wave mean period
var tmesWavesMeanPeriod = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wmp-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,10',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/alg'
});

var tmesWavesMeanPeriod_std = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wmp-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,   
    markerclipping: true,
    styles: 'boxfill/alg'
});
// waves mean direction
var tmesWavesMeanDirection_std = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wmd-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,10',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/rainbow'
});
var tmesWavesMeanDirection = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wmd-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,360',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 100,
    styles: 'boxfill/rainbow'
        // styles: 'areafill/scb_greens'
});





var proxy = 'server/proxy.php';
//sea level
var tmesWaterLevelTimeLayer = L.timeDimension.layer.wms(tmesWaterLevel, {
    //proxy: proxy,
    wmsVersion: '1.3.0',
    updateTimeDimension: true
});
var tmesWaterLevel_stdTimeLayer = L.timeDimension.layer.wms(tmesWaterLevel_std, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});
//waves height
var tmesWavesSignificantHeightTimeLayer = L.timeDimension.layer.wms(tmesWavesSignificantHeight, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});
var tmesWavesSignificantHeight_stdTimeLayer = L.timeDimension.layer.wms(tmesWavesSignificantHeight_std, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});
//waves mean direction
var tmesWavesMeanDirectionTimeLayer = L.timeDimension.layer.wms(tmesWavesMeanDirection, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});
var tmesWavesMeanDirection_stdTimeLayer = L.timeDimension.layer.wms(tmesWavesMeanDirection_std, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});
// waves mean period
var tmesWavesMeanPeriodTimeLayer = L.timeDimension.layer.wms(tmesWavesMeanPeriod, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});
var tmesWavesMeanPeriod_stdTimeLayer = L.timeDimension.layer.wms(tmesWavesMeanPeriod_std, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});


var tmesgeneralLegend = L.control({
    position: 'bottomright'
});


tmesgeneralLegend.onAdd = function(map,layer) {
    var layername = layer.options.layers;
    var scalerange = layer.options.colorscalerange.split(",");
    var wmsurl = layer.layer._currentLayer._wmsUrl;
    var src = wmsurl + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=alg2&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        div.innerHTML += scalerange[1] + '<br><img src="' + src + '" alt="legend"><br>' + scalerange[0];
    return div;
};


var tmesWaterLevelLegend = L.control({
    position: 'bottomright'
});
tmesWaterLevelLegend.onAdd = function(map) {
    var layername = tmesWaterLevel.options.layers;
    var scalerange = tmesWaterLevel.options.colorscalerange.split(",")
    var src = tmes_wl_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=alg2&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += '<label>>=' + scalerange[1] + '</label><br><img src="' + src + '" alt="legend"><br><label><=' + scalerange[0] +'</label>';
    return div;
};

var tmesWaterLevel_stdLegend = L.control({
    position: 'bottomright'
});
tmesWaterLevel_stdLegend.onAdd = function(map) {
    var layername = tmesWaterLevel_std.options.layers;
    var scalerange = tmesWaterLevel_std.options.colorscalerange.split(",")
    var src = tmes_wl_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=redblue&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += scalerange[1] + '<br><div style="background-image:url(\'' + src + '\'); width:10px; height: 75px;" alt="legend"></div><br>' + scalerange[0];
    return div;
};

var tmesWavesSignificantHeightLegend = L.control({
    position: 'bottomright'
});
tmesWavesSignificantHeightLegend.onAdd = function(map) {
    var layername = tmesWavesSignificantHeight.options.layers;
    var scalerange = tmesWavesSignificantHeight.options.colorscalerange.split(",")
    var src = tmes_wv_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=occam&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += scalerange[1] + '<br><img src="' + src + '" alt="legend"><br>' + scalerange[0];
    return div;
};

var tmesWavesSignificantHeight_stdLegend = L.control({
    position: 'bottomright'
});
tmesWavesSignificantHeight_stdLegend.onAdd = function(map) {
    var layername = tmesWavesSignificantHeight_std.options.layers;
    var scalerange = tmesWavesSignificantHeight_std.options.colorscalerange.split(",")
    var src = tmes_wv_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=occam&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += scalerange[1] + '<br><div style="background-image:url(\'' + src + '\'); width:10px; height: 75px;" alt="legend"></div><br>' + scalerange[0];
    return div;
};

var tmesWavesMeanPeriodLegend = L.control({
    position: 'bottomright'
});
tmesWavesMeanPeriodLegend.onAdd = function(map) {
    var layername = tmesWavesMeanPeriod.options.layers;
    var scalerange = tmesWavesMeanPeriod.options.colorscalerange.split(",")
    var src = tmes_wv_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=alg&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += scalerange[1] + '<br><img src="' + src + '" alt="legend"><br>' + scalerange[0];
    return div;
};

var tmesWavesMeanPeriod_stdLegend = L.control({
    position: 'bottomright'
});
tmesWavesMeanPeriod_stdLegend.onAdd = function(map) {
    var layername = tmesWavesMeanPeriod_std.options.layers;
    var scalerange = tmesWavesMeanPeriod_std.options.colorscalerange.split(",")
    var src = tmes_wv_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=alg&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += scalerange[1] + '<br><img src="' + src + '" alt="legend"><br>' + scalerange[0];
    return div;
};

var tmesWavesMeanDirectionLegend = L.control({
    position: 'bottomright'
});
tmesWavesMeanDirectionLegend.onAdd = function(map) {
    var layername = tmesWavesMeanDirection.options.layers;
    var scalerange = tmesWavesMeanDirection.options.colorscalerange.split(",")
    var src = tmes_wv_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=rainbow&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += scalerange[1] + '<br><div style="background-image:url(\'' + src + '\'); width:10px; height: 75px;" alt="legend"></div><br>' + scalerange[0];
    return div;
};

var tmesWavesMeanDirection_stdLegend = L.control({
    position: 'bottomright'
});
tmesWavesMeanDirection_stdLegend.onAdd = function(map) {
    var layername = tmesWavesMeanDirection_std.options.layers;
    var scalerange = tmesWavesMeanDirection_std.options.colorscalerange.split(",")
    var src = tmes_wv_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=rainbow&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += scalerange[1] + '<br><div style="background-image:url(\'' + src + '\'); width:10px; height: 75px;" alt="legend"></div><br>' + scalerange[0];
    return div;
};




var overGroup = new L.layerGroup([tmesWaterLevelTimeLayer,
				tmesWaterLevel_stdTimeLayer,
				tmesWavesSignificantHeightTimeLayer,
				tmesWavesSignificantHeight_stdTimeLayer,
				tmesWavesMeanPeriodTimeLayer,
				tmesWavesMeanPeriod_stdTimeLayer,
				tmesWavesMeanDirectionTimeLayer,
				tmesWavesMeanDirection_stdTimeLayer
		]);


var overlayMaps = {
    "TMES - Sea level mean": tmesWaterLevelTimeLayer,
    "TMES - Sea level standard deviation": tmesWaterLevel_stdTimeLayer,
    "TMES - WSH Waves Significant Height": tmesWavesSignificantHeightTimeLayer,
    "TMES - WSH standard deviation": tmesWavesSignificantHeight_stdTimeLayer,
    "TMES - WMP Waves Mean Period": tmesWavesMeanPeriodTimeLayer,
    "TMES - WMP standard deviation": tmesWavesMeanPeriod_stdTimeLayer,
    "TMES - WMD Waves Mean Direction": tmesWavesMeanDirectionTimeLayer,
    "TMES - WMD standard deviation": tmesWavesMeanDirection_stdTimeLayer,
    //"SAPO - direction of the peak": sapoPeakDirectionTimeLayer
};

//manage legend substitution
map.on('overlayadd', function(eventLayer) {
      console.log(eventLayer);
	//tmesgeneralLegend.addTo(this, eventlayer);
    switch (eventLayer.name){
	case  'TMES - Sea level mean': 
        setTimeout(function() {
	//tmesWaterLevelTimeLayer.removeFrom(map);
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
	tmesWavesSignificantHeight_stdTimeLayer.removeFrom(map);
	tmesWavesMeanPeriodTimeLayer.removeFrom(map);
	tmesWavesMeanPeriod_stdTimeLayer.removeFrom(map);
	tmesWavesMeanDirectionTimeLayer.removeFrom(map);
	tmesWavesMeanDirection_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWaterLevelLegend.addTo(this);
	break;
    	case 'TMES - Sea level standard deviation':
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);
        //tmesWaterLevel_stdTimeLayer.removeFrom(map);
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        tmesWavesSignificantHeight_stdTimeLayer.removeFrom(map);
        tmesWavesMeanPeriodTimeLayer.removeFrom(map);
        tmesWavesMeanPeriod_stdTimeLayer.removeFrom(map);
        tmesWavesMeanDirectionTimeLayer.removeFrom(map);
        tmesWavesMeanDirection_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWaterLevel_stdLegend.addTo(this);
	break;
        case  'TMES - WSH Waves Significant Height':
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);   
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        //tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        tmesWavesSignificantHeight_stdTimeLayer.removeFrom(map);
        tmesWavesMeanPeriodTimeLayer.removeFrom(map);
        tmesWavesMeanPeriod_stdTimeLayer.removeFrom(map);
        tmesWavesMeanDirectionTimeLayer.removeFrom(map);
        tmesWavesMeanDirection_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWavesSignificantHeightLegend.addTo(this);
	break;
        case  'TMES - WSH standard deviation':
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);   
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        //tmesWavesSignificantHeight_stdTimeLayer.removeFrom(map);
        tmesWavesMeanPeriodTimeLayer.removeFrom(map);
        tmesWavesMeanPeriod_stdTimeLayer.removeFrom(map);
        tmesWavesMeanDirectionTimeLayer.removeFrom(map);
        tmesWavesMeanDirection_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWavesSignificantHeight_stdLegend.addTo(this);
        break;
        case  'TMES - WMP Waves Mean Period':
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);   
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        tmesWavesSignificantHeight_stdTimeLayer.removeFrom(map);
        //tmesWavesMeanPeriodTimeLayer.removeFrom(map);
        tmesWavesMeanPeriod_stdTimeLayer.removeFrom(map);
        tmesWavesMeanDirectionTimeLayer.removeFrom(map);
        tmesWavesMeanDirection_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWavesMeanPeriodLegend.addTo(this);
        break;
        case  'TMES - WMP standard deviation':
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);   
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        tmesWavesSignificantHeight_stdTimeLayer.removeFrom(map);
        tmesWavesMeanPeriodTimeLayer.removeFrom(map);
        //tmesWavesMeanPeriod_stdTimeLayer.removeFrom(map);
        tmesWavesMeanDirectionTimeLayer.removeFrom(map);
        tmesWavesMeanDirection_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWavesMeanPeriod_stdLegend.addTo(this);
        break;
        case  'TMES - WMD Waves Mean Direction':
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);   
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        tmesWavesSignificantHeight_stdTimeLayer.removeFrom(map);
        tmesWavesMeanPeriodTimeLayer.removeFrom(map);
        tmesWavesMeanPeriod_stdTimeLayer.removeFrom(map);
        //tmesWavesMeanDirectionTimeLayer.removeFrom(map);
        tmesWavesMeanDirection_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWavesMeanDirectionLegend.addTo(this);
        break;
        case  'TMES - WMD standard deviation':
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);   
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        tmesWavesSignificantHeight_stdTimeLayer.removeFrom(map);
        tmesWavesMeanPeriodTimeLayer.removeFrom(map);
        tmesWavesMeanPeriod_stdTimeLayer.removeFrom(map);
        tmesWavesMeanDirectionTimeLayer.removeFrom(map);
        //tmesWavesMeanDirection_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWavesMeanDirection_stdLegend.addTo(this);
        break;




    
    }
});

//remove other legend

map.on('overlayremove', function(eventLayer) {
    if (eventLayer.name == 'TMES - Sea level mean') {
        map.removeControl(tmesWaterLevelLegend);
    } else if (eventLayer.name == 'TMES - Sea level standard deviation') {
        map.removeControl(tmesWaterLevel_stdLegend);     
    } else if (eventLayer.name == 'TMES - WSH Waves Significant Height'){
        map.removeControl(tmesWavesSignificantHeightLegend);
    } else if (eventLayer.name == 'TMES - WSH standard deviation'){
        map.removeControl(tmesWavesSignificantHeight_stdLegend);
    } else if (eventLayer.name == 'TMES - WMP Waves Mean Period'){
        map.removeControl(tmesWavesMeanPeriodLegend);
    } else if (eventLayer.name == 'TMES - WMP standard deviation'){
        map.removeControl(tmesWavesMeanPeriod_stdLegend);
    } else if (eventLayer.name == 'TMES - WMD Waves Mean Direction'){
        map.removeControl(tmesWavesMeanDirectionLegend);
    } else if (eventLayer.name == 'TMES - WMD standard deviation'){
        map.removeControl(tmesWavesMeanDirection_stdLegend);

    }

});

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps, {collapsed: false}).addTo(map);

tmesWaterLevelTimeLayer.addTo(map);
//tmesWaterLevel_stdTimeLayer.addTo(map);



