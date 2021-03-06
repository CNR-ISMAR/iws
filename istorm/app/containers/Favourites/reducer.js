/*
 *
 * MapPage reducer
 *
 *//* 

 
import produce from 'immer';
import { REQUEST_FAVOURITES, REQUEST_FAVOURITES_SUCCESS, DELETE_FAVOURITE, 
  DELETE_FAVOURITE_SUCCESS, REQUEST_ERROR } from './constants';

export const initialState = {
  loading: false,
  error: null,
  results: []
};


const favouritesReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case REQUEST_FAVOURITES:
        draft.loading = true;
        draft.error = initialState.error;
        draft.results = []
      break;
      case REQUEST_FAVOURITES_SUCCESS:
          draft.loading = false;
          draft.error = initialState.error;
          draft.results = action.result;
        break;
      case DELETE_FAVOURITE:
          draft.loading = true;
          draft.error = initialState.error;
         
        break;
      case DELETE_FAVOURITE_SUCCESS:
          draft.loading = false;
        break;
      case REQUEST_ERROR:
          draft.loading = false;
          draft.error = action.error;
      break;
    };
  });

export default favouritesReducer; */
