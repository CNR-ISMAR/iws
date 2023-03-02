/**
 * Get the extent of area of interest from map bbox
 * the values of the extent are expressed in the unit of the projection
 * @param {Object} Options containing layers and features
 * @returns {Array} containng minx, miny, maxx, maxy
 * minx, miny -> bottom-left corner of square
 * maxx, maxy -> top-right corner of square
 */
export const getExtent = ({
    features,
    layers
}) => {
    if (features && features.length > 0) {
        return turfBbox({ type: 'FeatureCollection', features });
    }
    const { bbox } = layers.find(({ isDataset }) => isDataset) || {};
    const { bounds, crs } = bbox || {};
    if (bounds && crs === 'EPSG:4326') {
        const { minx, miny, maxx, maxy } = bounds;
        return [minx, miny, maxx, maxy];
    }
    return null;
};