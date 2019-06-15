import React from 'react'
import { Map, TileLayer, Marker, Popup, WMSTileLayer, useLeaflet, LayersControl } from 'react-leaflet';
// import WmsTimedimensionLayer from '../utils/leaflet/TimeDimension';
// import BingLayer from '../utils/leaflet/bing';
// import { useLeafletMap } from '../utils/leaflet'

import "leaflet/dist/leaflet.css";
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
// import 'leaflet-timedimension/dist/leaflet.timedimension.src';
import '../utils/leaflet/TimeDimension/leaflet.timedimension';
import nezasa from 'iso8601-js-period';

// const BingLayer = require('../utils/leaflet/bing').BingLayer
const WmsTimedimensionLayer = require('../utils/leaflet/TimeDimension').WmsTimedimensionLayer;
// const nezasa = require('iso8601-js-period');

const markerIcon = L.icon({
  iconUrl: iconUrl,
  iconShadow: iconShadow
});

console.log(nezasa)

const { BaseLayer } = LayersControl;
const bing_key = "YOUR-BING-KEY"


const basemapUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const position   = [40.416775, -3.703790];
const Content    = () => (
    <Map center={position}
         zoom={13}
         timeDimension={true}
         timeDimensionControl={true}
         timeDimensionOptions={{
            timeInterval: new nezasa.Period.parse("2014-09-30/2014-10-30"),
            period: "PT1H"
        }}
    >
      <TileLayer
        url={basemapUrl}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <WmsTimedimensionLayer
        version={"1.1.1"}
        wmsUrl={"http://thredds.socib.es/thredds/wms/observational/hf_radar/hf_radar_ibiza-scb_codarssproc001_aggregation/dep0001_hf-radar-ibiza_scb-codarssproc001_L1_agg.nc"}
        layers={'sea_water_velocity'}
        format={'image/png'}
        transparent={true}
        attribution={'SOCIB HF RADAR | sea_water_velocity'}
      >
      </WmsTimedimensionLayer>
      <Marker position={position} icon={markerIcon}>
        <Popup>
          <span>A pretty CSS3 popup.<br/>Easily customizable.</span>
        </Popup>
      </Marker>
    </Map>
);

export default Content;
