var startDate = new Date();
startDate.setUTCHours(0, 0, 0, 0);

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
        timeInterval: "2018-10-29/2018-10-31",
        period: "PT1H",
        currentTime: Date.parse("2018-10-29T00:00:00.000Z")
    },
    center: [42.10, 17.90]
});

var tmesWMS = "https://iws.ismar.cnr.it/thredds/wms/mean/TMES_sea-level_20181029.nc";
var tmesWaterLevel = L.nonTiledLayer.wms(tmesWMS, {
    layers: 'water_level_mean',
    format: 'image/png',
    transparent: true,
    colorscalerange: '0,1.5',
    abovemaxcolor: "extend",
    belowmincolor: "extend",
    numcolorbands: 100,
    styles: 'boxfill/alg2'
        // styles: 'areafill/scb_greens'
});

var tmesWaterLevel_std = L.nonTiledLayer.wms(tmesWMS, {
    layers: 'water_level_std',
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


var tmesWaterLevelLegend = L.control({
    position: 'bottomright'
});
tmesWaterLevelLegend.onAdd = function(map) {
    var layername = tmesWaterLevel.options.layers;
    var scalerange = tmesWaterLevel.options.colorscalerange.split(",")
    var src = tmesWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=alg2&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
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
    var src = tmesWMS + "?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=" + layername + "&PALETTE=redblue&COLORBARONLY=true&WIDTH=10&HEIGHT=150";
    var div = L.DomUtil.create('div', 'info legend');
    div.innerHTML += scalerange[1] + '<br><div style="background-image:url(\'' + src + '\'); width:10px; height: 75px;" alt="legend"></div><br>' + scalerange[0];
    return div;
};


var overlayMaps = {
    "TMES - mean water level": tmesWaterLevelTimeLayer,
    "TMES - standard deviation": tmesWaterLevel_stdTimeLayer,
    //"SAPO - direction of the peak": sapoPeakDirectionTimeLayer
};

map.on('overlayadd', function(eventLayer) {
    if (eventLayer.name == 'TMES - mean water level') {
        setTimeout(function() {
        tmesWaterLevel_stdTimeLayer.removeFrom(map)
        }, 10);
        tmesWaterLevelLegend.addTo(this);
    } else if (eventLayer.name == 'TMES - standard deviation') {
        setTimeout(function() {
        tmesWaterLevelTimeLayer.removeFrom(map)
        }, 10);
        tmesWaterLevel_stdLegend.addTo(this);
    }
});

map.on('overlayremove', function(eventLayer) {
    if (eventLayer.name == 'TMES - mean water level') {
        map.removeControl(tmesWaterLevelLegend);
    } else if (eventLayer.name == 'TMES - standard deviation') {
        map.removeControl(tmesWaterLevel_stdLegend);
    }
});

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps).addTo(map);

tmesWaterLevelTimeLayer.addTo(map);
//tmesWaterLevel_stdTimeLayer.addTo(map);

