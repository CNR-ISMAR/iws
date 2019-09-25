
import React from "react";
import Button from '@material-ui/core/Button';

export const ENQUEUE_SNACKBAR = '@NOTISTACK/ENQUEUE_SNACKBAR';
export const CLOSE_SNACKBAR = '@NOTISTACK/CLOSE_SNACKBAR';
export const REMOVE_SNACKBAR = '@NOTISTACK/REMOVE_SNACKBAR';
export const FILL_NOTIFICATIONS = '@NOTISTACK/FILL_NOTIFICATIONS';

export const enqueueSnackbar = notification => {
    const key = notification.options && notification.options.key;

    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            ...notification,
            key: key || new Date().getTime() + Math.random(),
        },
    };
};


export const fillNotifications = notification => {
    const key = notification.options && notification.options.key;

    return {
        type: FILL_NOTIFICATIONS,
        notification: ['test notfica'],
    };
};

export const closeSnackbar = key => ({
    type: CLOSE_SNACKBAR,
    dismissAll: !key, // dismiss all if no key has been defined
    key,
});

export const removeSnackbar = key => ({
    type: REMOVE_SNACKBAR,
    key,
});

export const enqueueSuccess = (text) => {
    return enqueueSnackbar({
        message: text,
        options: {
            key: new Date().getTime() + Math.random(),
            variant: 'success',
        }
    });
}