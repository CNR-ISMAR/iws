/* import produce from 'immer';
import { REQUEST_NOTIFICATION, REQUEST_NOTIFICATION_SUCCESS, REQUEST_ERROR, } from './constants';


export const initialState = {
    
    loading: false,
    error: null,    
    results: []
    
}
  
const notificationReducer = (state = initialState, action) => {
    produce(state, draft => {
        switch (action.type) {
        case REQUEST_NOTIFICATION:
            draft.loading = true;
            draft.error = initialState.error;
            draft.results = []
        break;
        case REQUEST_NOTIFICATION_SUCCESS:
            draft.loading = false;
            draft.error = initialState.error;
            draft.results = action.result;
            break;
        case REQUEST_ERROR:
            draft.loading = false;
            draft.error = action.error;
        break;
        default: // need this for default case
            return state 
            
        }
       
        
    })
}
export default notificationReducer; */