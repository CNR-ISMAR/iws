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
export const ZOOM_IN = 'app/App/ZOOM_IN';
export const ZOOM_OUT = 'app/App/ZOOM_OUT';
export const SET_VIEWPORT = 'app/App/SET_VIEWPORT';