import React from 'react'
import { createRoot } from 'react-dom/client'

import 'leaflet';
import '../style/main.scss'

import App from './App'

const container = createRoot(document.getElementById('app'))
container.render(<App />)

if(module.hot){
  module.hot.accept()
}