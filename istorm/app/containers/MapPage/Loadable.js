/**
 *
 * Asynchronously loads the component for MapPage
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
