/*
 *
 * MapPage actions
 *
 */

import { TOGGLE_LAYER_VISIBILITY } from './constants';

export function toggleLayerVisibility(layer) {
  return {
    type: TOGGLE_LAYER_VISIBILITY,
    layer: layer
  };
}
