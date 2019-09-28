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




var tmes_wl_WMS = "https://iws.ismar.cnr.it/thredds/wms/tmes/TMES_sea_level_" + todayString + ".nc";
var tmesWaterLevel = L.nonTiledLayer.wms(tmes_wl_WMS, {
    layers: 'sea_level-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-1.5,1.5',
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
    colorscalerange: '-0.5,0.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/redblue'
});

var tmes_wv_WMS = "https://iws.ismar.cnr.it/thredds/wms/tmes/TMES_waves_" + todayString  + ".nc";

var tmesWavesMeanDirection = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wmd-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,1.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 100,
    styles: 'boxfill/ncview'
        // styles: 'areafill/scb_greens'
});

var tmesWavesMeanDirection_std = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wmd-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '-0.5,0.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/redblue'
});

var tmesWavesMeanDirection = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wmd-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,1.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 100,
    styles: 'boxfill/ncview'
        // styles: 'areafill/scb_greens'
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
    styles: 'boxfill/ncview'
});
//wave significant height
var tmesWavesSignificantHeight = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wsh-mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,3',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,
    markerclipping: true,
    styles: 'boxfill/occam'
});

//wave significant height std
var tmesWavesSignificantHeight_std = L.nonTiledLayer.wms(tmes_wv_WMS, {
    layers: 'wsh-std',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,1',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    markerscale: 15,
    markerspacing: 12,   
    markerclipping: true,
    styles: 'boxfill/occam'
});







var proxy = 'server/proxy.php';
var tmesWaterLevelTimeLayer = L.timeDimension.layer.wms(tmesWaterLevel, {
    //proxy: proxy,
    wmsVersion: '1.3.0',
    updateTimeDimension: true
});

var tmesWaterLevel_stdTimeLayer = L.timeDimension.layer.wms(tmesWaterLevel_std, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});

var tmesWavesSignificantHeightTimeLayer = L.timeDimension.layer.wms(tmesWavesSignificantHeight, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});

var tmesWavesSignificantHeightTimeLayer_std = L.timeDimension.layer.wms(tmesWavesSignificantHeight_std, {
    //proxy: proxy
    wmsVersion: '1.3.0',
});



var tmesWaterLevelLegend = L.control({
    position: 'bottomright'
});
tmesWaterLevelLegend.onAdd = function(map) {
    var layername = tmesWaterLevel.options.layers;
    var scalerange = tmesWaterLevel.options.colorscalerange.split(",")
    var src = tmes_wl_WMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=alg2&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML +=
        div.innerHTML += scalerange[1] + '<br><img src="' + src + '" alt="legend"><br>' + scalerange[0];
    return div;
};

var tmesWaterLevel_stdLegend = L.control({
    position: 'bottomright'
});
tmesWaterLevel_stdLegend.onAdd = function(map) {
    var layername = tmesWaterLevel_std.options.layers;
    var scalerange = tmesWaterLevel.options.colorscalerange.split(",")
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
    div.innerHTML += scalerange[1] + '<br><div style="background-image:url(\'' + src + '\'); width:10px; height: 75px;" alt="legend"></div><br>' + scalerange[0];
    return div;
};

var overlayMaps = {
    "TMES - Sea level mean": tmesWaterLevelTimeLayer,
    "TMES - Sea level standard deviation": tmesWaterLevel_stdTimeLayer,
    "TMES - Waves Significant Height": tmesWavesSignificantHeightTimeLayer,
    //"SAPO - direction of the peak": sapoPeakDirectionTimeLayer
};

//manage legend substitution
map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'TMES - Sea level mean') {
        setTimeout(function() {
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        }, 10);
        setTimeout(function() {
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        }, 10);
        tmesWaterLevelLegend.addTo(this);
    } else if (eventLayer.name == 'TMES - Sea level standard deviation') {
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);
        }, 10);
        setTimeout(function() {
        tmesWavesSignificantHeightTimeLayer.removeFrom(map);
        }, 10);
        tmesWaterLevel_stdLegend.addTo(this);
    } else if (eventLayer.name == 'TMES - Waves Significant Height') {
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map);
        }, 10);
        setTimeout(function() {
        tmesWaterLevel_stdTimeLayer.removeFrom(map);
        }, 10);
        tmesWavesSignificantHeightLegend.addTo(this);    
    }
});

//remove other legend

map.on('overlayremove', function(eventLayer) {
    if (eventLayer.name == 'TMES - Sea level mean') {
        map.removeControl(tmesWaterLevelLegend);
    } else if (eventLayer.name == 'TMES - Sea level standard deviation') {
        map.removeControl(tmesWaterLevel_stdLegend);     
    } else if (eventLayer.name == 'TMES - Waves Significant Height'){
        map.removeControl(tmesWavesSignificantHeightLegend);
    }
});

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps, {collapsed:false}).addTo(map);

tmesWaterLevelTimeLayer.addTo(map);
//tmesWaterLevel_stdTimeLayer.addTo(map);

