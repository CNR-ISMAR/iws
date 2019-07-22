window.$ = window.jQuery = require('jquery');
import dialogPolyfill from 'dialog-polyfill'
import 'ol/ol.css';
import { Map, View, Feature } from 'ol';
import Overlay from 'ol/Overlay';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Heatmap as HeatmapLayer } from 'ol/layer';
import { fromLonLat, transform as transformCoordinate } from 'ol/proj';
import Geolocation from 'ol/Geolocation';
import { Style, Circle as CircleStyle, Fill, Stroke, Icon } from 'ol/style';
import { defaults as defaultInteraction } from 'ol/interaction';
import { Point, Circle } from 'ol/geom';
import GeoJSON from 'ol/format/GeoJSON';


    function updateWindScale() {
        if (!wind || !wind.windData) {
            return;
        }

        let data = wind.windData;

        let resolution = map.getView().getResolution();
        let scale = data.resolution / resolution;

        let position = map.getPixelFromCoordinate([data.offset_x, data.offset_y]);
        if (!position) {
            return;
        }
        position[1] -= data.height * scale;

        let offset = [
            Math.max(-position[0] / scale, 0),
            Math.max(-position[1] / scale, 0)
        ];

        wind.move(position[0], position[1]);
        wind.offset(offset[0], offset[1]);
        wind.zoom(scale);
        wind.reset();

        if (showWind) {
            windCanvas.hidden = false;
        }
    }

    map.on('movestart', function() {
        windCanvas.hidden = true;
    });
    map.on('moveend', function() {
        updateWindScale();
        updateVisibilityByZoom();
    });


    let mapContainer = $("#map-container");
    let windCanvas = document.getElementById("windCanvas");
    windCanvas.width = mapContainer.width();
    windCanvas.height = mapContainer.height();

    let wind = null;
    const gl = windCanvas.getContext('webgl', {antialiasing: false});

    if (gl) {
        wind = new WindGL(gl);
        wind.numParticles = calcNumParticles();
    }
    else {
        showSnackbar("Il vento non può essere visualizzato.");
    }

    function calcNumParticles() {
        return Math.min(Math.floor(mapContainer.width() / 10 * mapContainer.height() / 10),
            3000);
    }

    function drawWind() {
        if (wind.windData && !windCanvas.hidden) {
            wind.draw();
        }
        requestAnimationFrame(drawWind);
    }

    if (wind) {
        drawWind();
    }

    function updateWindCanvasSize() {
        if (!wind) {
            return;
        }

        windCanvas.width = mapContainer.width();
        windCanvas.height = mapContainer.height();
        wind.resize();

        wind.numParticles = calcNumParticles();
    }

    function refreshWind() {
        return new Promise(function(resolve, reject) {
            if (!wind) {
                resolve();
                return;
            }
            var req = new XMLHttpRequest();
            req.onload = function() {
                let data = tryParseJson(req.response);

                if (!data || !data.width) {
                  console.log('ERROR')
                    reject();
                    return;
                }

                let windData = data;

                if (windData.error) {
                  console.log('ERROR')
                }
                else {
                    const windImage = new Image();
                    windData.image = windImage;
//                    windImage.src = HOST + "/wind-map.png";
                    windImage.src = HOST + "/2019071600.png";
                    windImage.onload = function () {
                        wind.setWind(windData);
                        updateWindScale();
                    };
                }

                resolve();
            }
            req.onerror = function() {
                reject();
                  console.log('ERROR')
            }

            req.open("GET", HOST + "/wind-map-metadata.json", true);
            req.send();
        });
    }


    refreshWind()
