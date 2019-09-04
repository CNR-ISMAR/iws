import produce from 'immer';
import { REQUEST_NOTIFICATION } from './constants';

const initialState = {
    notifications: [{
        id: 1,
        title: 'alert',
        body: 'ciao',
    },
    {
        id: 2,
        title: 'alert2',
        body: 'ciao2',
    }
    ],
};


const NotificationReducer = (state = initialState, action) =>
  
    produce(state, ( draft ) => {
        switch (action.type) {
        case REQUEST_NOTIFICATION:
            draft.notifications = [];
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