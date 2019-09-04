import produce from 'immer';
import { REQUEST_NOTIFICATION } from './constants';

const initialState = {
    testNotification: 'testNotificationBLABLA',
};


const NotificationReducer = (state = initialState, action) =>
  
    produce(state, ( draft ) => {
        switch (action.type) {
        case REQUEST_NOTIFICATION:
            draft.testNotification = 'testNotificationCHANGED';
            break;
        }
    })   
   /* {
    const newState = {...state}
    if (action.type === REQUEST_NOTIFICATION) {
        newState.testNotification = 'testNotificationCHANGED';
    }
    return newState
   } */

export default NotificationReducer;