/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */
export const TOGGLE_LAYER_VISIBILITY = 'app/App/TOGGLE_LAYER_VISIBILITY';
export const TOGGLE_LAYER_MEAN = 'app/App/TOGGLE_LAYER_MEAN';
export const ZOOM_IN = 'app/App/ZOOM_IN';
export const ZOOM_OUT = 'app/App/ZOOM_OUT';
export const SET_VIEWPORT = 'app/App/SET_VIEWPORT';
export const REQUEST_INFO_LAYER = 'app/App/REQUEST_INFO_LAYER';
export const REQUEST_INFO_LAYER_SUCCESS = 'app/App/REQUEST_INFO_LAYER_SUCCESS';

export const POST_FAVOURITE = 'app/App/POST_FAVOURITE';
export const POST_FAVOURITE_SUCCESS = 'app/App/POST_FAVOURITE_SUCCESS';
export const POST_FAVOURITE_EMPTY = 'app/App/POST_FAVOURITE_EMPTY';
export const DELETE_POST_FAVOURITE = 'app/App/DELETE_POST_FAVOURITE';
export const DELETE_POST_FAVOURITE_SUCCESS = 'app/App/DELETE_POST_FAVOURITE_SUCCESS';

export const REQUEST_FAVOURITES_LAYER = 'app/App/REQUEST_FAVOURITES_LAYER';
export const REQUEST_FAVOURITES_LAYER_SUCCESS = 'app/App/REQUEST_FAVOURITES_LAYER_SUCCESS';

export const FILL_IF_IS_FAVOURITE = 'app/App/FILL_IF_IS_FAVOURITE';

export const REQUEST_FAVOURITES = 'app/App/REQUEST_FAVOURITES';
export const REQUEST_FAVOURITES_SUCCESS = 'app/App/REQUEST_FAVOURITES_SUCCESS';
export const DELETE_FAVOURITE = 'app/App/DELETE_FAVOURITE';
export const DELETE_FAVOURITE_SUCCESS = 'app/App/DELETE_FAVOURITE_SUCCESS';

export const SET_LAT_LON = 'app/App/SET_LAT_LON';

export const REQUEST_ERROR = 'app/App/REQUEST_ERROR';
export const TOGGLE_INFO_LAYER = 'app/App/TOGGLE_INFO_LAYER';
export const EMPTY_INFO_LAYER = 'app/App/EMPTY_INFO_LAYER';
export const DISMISS_CREDITS = 'app/App/DISMISS_CREDITS';
export const SYNC_DISMISS = 'app/App/SYNC_DISMISS';








