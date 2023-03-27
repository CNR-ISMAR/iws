const LAST_DAY = moment().utc().startOf('days').add(2, 'days')
const FIRST_DATE = moment().utc().year(2019).month(11).date(28).hour(1);

function toTimeAvailable(from, to, interval = "PT1H") {
  return [from.valueOf(), `${from.toISOString().slice(0, 10)}/${to.toISOString().slice(0, 10)}/${interval}`];
}

const OPTIONS = [
  {
    id: 1, name: 'Oggi/Domani', times: toTimeAvailable(
      moment().utc().startOf('day'),
      LAST_DAY
    )
  },
  {
    id: 2, name: 'Settimana corrente', times: toTimeAvailable(
      moment().utc().startOf('week').startOf('day'),
      LAST_DAY
    )
  },
  {
    id: 3, name: 'Mese corrente', times: toTimeAvailable(
      moment().utc().startOf('month').startOf('day'),
      LAST_DAY
    )
  },
  {
    id: 4, name: 'Anno corrente', times: toTimeAvailable(
      moment().utc().startOf('year').startOf('day'),
      LAST_DAY
    )
  },
  {
    id: 5, name: 'Anno Precendente', times: toTimeAvailable(
      moment().utc().startOf('year').startOf('day').subtract(1, 'year'),
      LAST_DAY
    )
  },
  { id: 6, name: 'Tutto', times: toTimeAvailable(FIRST_DATE, LAST_DAY) },
]

var map = L.map('map', {
  ...window.TMES.MAP_OPTIONS,
  timeDimensionOptions: {
    timeInterval: OPTIONS[0].times[1].replace('/PT1H', ''),
    period: 'PT1H',
    currentTime: new Date(),
  },
});

map.createPane('topPane');
map.getPane('topPane').style.zIndex = 401;

function createLegend(layer) {
  let palette = ''
  if (layer.options.styles) {
    try {
      palette = layer.options.styles.split('/')[1];
    } catch (e) {
      console.error('Problemi con l\'estrazione della palette dal parametro styles')
    }
  }

  var src = `${layer.url}?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetLegendGraphic&LAYER=${layer.id}&PALETTE=${palette}&COLORBARONLY=true&WIDTH=20&HEIGHT=250`
  var div = L.DomUtil.create('div', 'info legend');


  var scalerange = layer.options.colorscalerange.split(",")
  if (layer.scaleMid) {
    var scalemid = Number(scalerange[0]) + Number(scalerange[1]);
    div.innerHTML += `<label>${scalerange[1]}m</label><br><div style="background-image:url(\'${src}\'); width:10px; height: 75px;" alt="legend"></div><br><label>${scalemid}m</label>`;
  } else {
    div.innerHTML += `<label>>=${scalerange[1]}m</label><br><img src="${src}" alt="legend"><br><label><=${scalerange[0]}m</label>`;
  }
  return div;
}

L.Control.DateSelector = L.Control.extend({
  onAdd: function (map) {
    var controlDiv = L.DomUtil.create('div', 'leaflet-command-wrapper');

    var select = L.DomUtil.create('select', '', controlDiv);
    select.innerHTML = OPTIONS.map(o => `<option value="${o.id}">${o.name}</option>`).join('');
    select.value = 1;

    L.DomEvent
      .addListener(select, 'change', L.DomEvent.stopPropagation)
      .addListener(select, 'change', L.DomEvent.preventDefault)
      .addListener(select, 'change', function (e) {
        const selected = OPTIONS.filter(o => o.id == e.target.value)[0];
        map.timeDimension.setAvailableTimes(selected.times[1], 'replace');
        map.timeDimension.setCurrentTime(selected.times[0]);
        window.TMES.TIME_DIMENSIONS[window.TMES.ACTIVE].removeFrom(map);
        window.TMES.TIME_DIMENSIONS[window.TMES.ACTIVE].addTo(map);
      });

    return controlDiv;
  }
})

L.control.dateSelector = function (opts) {
  return new L.Control.DateSelector(opts);
}

L.control.dateSelector({ position: 'bottomleft' }).addTo(map);

window.TMES.LAYERS_ORDER.forEach(lid => {
  const layer = window.TMES.LAYERS[lid];
  window.TMES.LEAFLET_LAYERS[lid] = L.nonTiledLayer.wms(layer.url, layer.options);
  window.TMES.TIME_DIMENSIONS[lid] = L.timeDimension.layer.wms.timeseries(window.TMES.LEAFLET_LAYERS[lid], { ...layer.time, markers: [] })
  window.TMES.LEGENDS[lid] = L.control({
    position: 'bottomright'
  })
  window.TMES.LEGENDS[lid].onAdd = () => {
    return createLegend(layer);
  }

  if (layer.defaultEnable) {
    window.TMES.INITIAL_LAYER = lid;
  }
})

const overlayMaps = window.TMES.LAYERS_ORDER.reduce((p, lid) => ({
  ...p,
  [window.TMES.LAYERS[lid].mapName]: window.TMES.TIME_DIMENSIONS[lid],
}), {})

//manage legend substitution
map.on('overlayadd', function (eventLayer) {
  const lid = window.TMES.LAYER_NAMES[eventLayer.name];
  window.TMES.ACTIVE = lid;

  setTimeout(function () {
    window.TMES.LAYERS_ORDER.filter(l => l !== lid).forEach(l => {
      window.TMES.TIME_DIMENSIONS[l].removeFrom(map);
    });
  }, 10);
  window.TMES.LEGENDS[lid].addTo(this);
});

//remove other legend
map.on('overlayremove', function (eventLayer) {
  const lid = window.TMES.LAYER_NAMES[eventLayer.name];
  map.removeControl(window.TMES.LEGENDS[lid]);
});

var baseLayers = getCommonBaseLayers(map); // see baselayers.js
L.control.layers(baseLayers, overlayMaps, { collapsed: false, hideSingleBase: true }).addTo(map);

window.TMES.TIME_DIMENSIONS[window.TMES.INITIAL_LAYER].addTo(map);
setTimeout(() => {
  const selected = OPTIONS[0];
  map.timeDimension.setAvailableTimes(selected.times[1], 'replace');
  map.timeDimension.setCurrentTime(selected.times[0]);
  window.TMES.TIME_DIMENSIONS[window.TMES.ACTIVE].removeFrom(map);
  window.TMES.TIME_DIMENSIONS[window.TMES.ACTIVE].addTo(map);
}, 2000);

