import {CanvasOverlay } from 'react-map-gl';
import GLLayerTest from './GLLayerTest';
import { window } from 'react-map-gl/src/utils/globals';
import PropTypes from 'prop-types';
import BaseControl from 'react-map-gl/dist/es6/components/base-control';
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import { createElement } from 'react';

const propTypes = Object.assign({}, BaseControl.propTypes, {
  redraw: PropTypes.func.isRequired
});
const defaultProps = {
  captureScroll: false,
  captureDrag: false,
  captureClick: false,
  captureDoubleClick: false
};

class GLCanvasOverlay extends CanvasOverlay {

  constructor() {
    super(...arguments);

    _defineProperty(this, "_canvas", void 0);

    _defineProperty(this, "_ctx", void 0);

    _defineProperty(this, "_redraw", () => {
      const ctx = this._ctx;

      if (!ctx) {
        return;
      }

      // const pixelRatio = window.devicePixelRatio || 1;
      // ctx.save();
      // ctx.scale(pixelRatio, pixelRatio);
      const _this$_context = this._context,
        viewport = _this$_context.viewport,
        isDragging = _this$_context.isDragging;
      this.props.redraw({
        width: viewport.width,
        height: viewport.height,
        ctx,
        isDragging,
        project: viewport.project.bind(viewport),
        unproject: viewport.unproject.bind(viewport)
      });
      // ctx.restore();
    });
  }



  componentDidMount() {
    const canvas = this._containerRef.current;

    if (canvas) {
      this._canvas = canvas;
      this._ctx = canvas.getContext('webgl', {antialiasing: false});
    }

    this._redraw();
  }

  _redraw = () => {
    // const ctx = this._ctx;
    // if (!ctx) {
    //   return;
    // }
    //
    // const pixelRatio = window.devicePixelRatio || 1;
    // ctx.save();
    // ctx.scale(pixelRatio, pixelRatio);
    //
    // const {viewport, isDragging} = this._context;
    // this.props.redraw({
    //   width: viewport.width,
    //   height: viewport.height,
    //   ctx,
    //   isDragging,
    //   project: viewport.project.bind(viewport),
    //   unproject: viewport.unproject.bind(viewport)
    // });
    //
    // ctx.restore();
  };










}


export default GLCanvasOverlay;
