import React from 'react'
import { createRoot } from 'react-dom/client'

import 'leaflet';
import '../style/main.scss'

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
    iconUrl: require('leaflet/dist/images/marker-icon.png').default,
    shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
});

import App from './App'

const container = createRoot(document.getElementById('app'))
container.render(<App />)

if(module.hot){
  module.hot.accept()
}