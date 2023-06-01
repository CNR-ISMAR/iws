import { head, isArray } from 'lodash';

export const geotourEnabledSelector  = state => state?.controls?.geotour?.enabled;

export const wholeSelector  = state => state;


/**
 * this selector allows you to fetch all the layers from the dedicated part of the store i.e. "layers",
 * note the initial destructuring
 * export const layersSelector = (state) =>
 * vs
 * export const layersSelector = ({layers, config} = {}) =>
*/
export const layersSelector = ({layers, config} = {}) => layers && isArray(layers) ? layers : layers && layers.flat || config && config.layers || [];

/**
 * this selector leverage the previous selector in order to obtain a layer given an intial id
*/
export const getLayerFromId = (state, id) => head(layersSelector(state).filter(l => l.id === id));


export const layerSelector2 = (state) => {
  const layers = state.layers.flat.filter(layer => filterLayers(layer));
  return layers.reverse();
};

function filterLayers(layer) {
  if (layer.group != 'background' && layer.visibility) {
      return layer;
  }
}

export const getStyleeditor = (state) => {
  return state.styleeditor;
}
