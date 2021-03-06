
/* 
*    Return common layers used in different examples
*/
function getCommonBaseLayers(map){
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    var bathymetryLayer = L.tileLayer.wms("http://ows.emodnet-bathymetry.eu/wms", {
        layers: 'emodnet:mean_atlas_land',
        format: 'image/png',
        transparent: true,
        attribution: "EMODnet Bathymetry",
        opacity: 0.5
    });
    var coastlinesLayer = L.tileLayer.wms("http://ows.emodnet-bathymetry.eu/wms", {
        layers: 'coastlines',
        format: 'image/png',
        transparent: true,
        attribution: "EMODnet Bathymetry",
        opacity: 0.8
    });
    var osmLayer2 = L.tileLayerPixelFilter('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    pane: 'topPane',
    matchRGBA: [ 0,  0,  0, 0  ],
    pixelCodes: [ [170, 211, 223] ],
	attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    });
    var bathymetryGroupLayer = L.layerGroup([bathymetryLayer, coastlinesLayer]);    
    //bathymetryGroupLayer.addTo(map);
    osmLayer2.addTo(map);
    return {
        "EMODnetBathymetry": bathymetryGroupLayer,
        "OSM": osmLayer2,
    };
}
