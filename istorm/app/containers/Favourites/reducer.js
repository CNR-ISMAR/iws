/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import { TOGGLE_DRAWER, OPEN_DRAWER, CLOSE_DRAWER, TOGGLE_DRAWER_MINI, CLOSE_DRAWER_MINI, OPEN_DRAWER_MINI } from './constants';

export const initialState = {
  favourites: {
    loading: false,
    error: null,
    list: [{
      title: "Ciao sono la prima"
    },{
      title: "hey ecco la seconda"
    }],
  }
};

/* eslint-disable default-case, no-param-reassign */
const mapPageReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TOGGLE_DRAWER:
        draft.drawer.open = !draft.drawer.open;
        break;
      case OPEN_DRAWER:
        draft.drawer.open = true;
        break;
      case CLOSE_DRAWER:
        draft.drawer.open = false;
        break;
      case TOGGLE_DRAWER_MINI:
        draft.drawer.minimal = !draft.drawer.minimal;
        break;
      case OPEN_DRAWER_MINI:
        draft.drawer.minimal = true;
        break;
      case CLOSE_DRAWER_MINI:
        draft.drawer.minimal = false;
        break;
    };
  });

export default mapPageReducer;
