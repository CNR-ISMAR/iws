// this is Root Module for Whole app, require lib we need.
// import Drone from './drone';
// import Canvas from "./chart/canvas";
// import Chart from "./chart/chartmodel";
// import Util from "./util";
// import Controllers from "./controller";

// import { myTween, sleep} from "./tween/Tween";
import { CanvasOverlayer } from './canvasOverlay';
import { DomOverlayer } from './domOverlay';
import { WindLayer } from './windLayer';
import { myTween } from './Tween';
// import * as Config from './config';
// var rbush = require('rbush');

// var HexgridHeatmap = require('./layers/hexgridHeatLayer');
// if(typeof mapboxgl != 'undefined')
//   mapboxgl.accessToken = Config.default.tk;
// Static Props..
export {
  CanvasOverlayer, DomOverlayer, WindLayer, myTween
}

