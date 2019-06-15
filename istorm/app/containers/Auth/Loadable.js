/**
 *
 * Asynchronously loads the component for Auth
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
