/*
 *
 * MapPage reducer
 *
 */
import produce from 'immer';
import { REQUEST_FAVOURITES, REQUEST_FAVOURITES_SUCCESS, REQUEST_ERROR } from './constants';

export const initialState = {
  favourites: {
    loading: false,
    error: null,
    list: [{
      id: "lol 1",
      title: "Ciao sono la prima"
    },{
      id: "lol 2",
      title: "hey ecco la seconda"
    }],
    result: []
  } 
  
};

/* eslint-disable default-case, no-param-reassign */
const favouritesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_FAVOURITES:
        draft.favourites.loading = true;
        draft.favourites.error = initialState.error;
      break;
      case REQUEST_FAVOURITES_SUCCESS:
          draft.favourites.loading = false;
          draft.favourites.error = initialState.error;
          draft.favourites.result = action.result;
        break;
      case REQUEST_ERROR:
          draft.favourites.loading = false;
          draft.favourites.error = action.error;
      break;
     /*  case TOGGLE_DRAWER:
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
        break; */
    };
  });

export default favouritesReducer;
