/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';
import { removeSnackbar, fillNotifications } from './actions';

class Notifier extends Component {
    displayed = [];

    storeDisplayed = (id) => {
        this.displayed = [...this.displayed, id];
    };

    /* componentDidMount(){
        console.log('COMPONENT DID MOUNT')
        console.log(this.props)
    } */

    shouldComponentUpdate({ notifications: newSnacks = [] }) {
        /* console.log('shouldComponentUpdate')
        console.log('shouldComponentUpdate')
        console.log('shouldComponentUpdate')
        console.log('shouldComponentUpdate')
        console.log('newSnacks')
        console.log('newSnacks')
        console.log('newSnacks')
        console.log('newSnacks')
        console.log(newSnacks) */
        if (!newSnacks.length) {
            this.displayed = [];
            return false;
        }
        const { notifications: currentSnacks } = this.props;
        /* console.log('currentSnacks')
        console.log('currentSnacks')
        console.log('currentSnacks')
        console.log('currentSnacks')
        console.log(currentSnacks) */

       
        let notExists = false;
        for (let i = 0; i < newSnacks.length; i += 1) {
            const newSnack = newSnacks[i];
            if (newSnack.dismissed) {
                this.props.closeSnackbar(newSnack.key);
                this.props.removeSnackbar(newSnack.key);
            }

            if (notExists) continue;
            notExists = notExists || !currentSnacks.filter(({ key }) => newSnack.key === key).length;
        }
        return notExists; 
    } 

    componentDidUpdate() {
        const { notifications = [] } = this.props;
        /* console.log('COMPONENT DID UPDATE')
        console.log('COMPONENT DID UPDATE')
        console.log('COMPONENT DID UPDATE')
        console.log('COMPONENT DID UPDATE') */

        console.log(notifications)
        notifications.forEach(({ key, message, options = { } }) => {
            // Do nothing if snackbar is already displayed
            if (this.displayed.includes(key)) return;
            // Display snackbar using notistack
            this.props.enqueueSnackbar(message, {
                ...options,
                onClose: (event, reason, key) => {
                    if (options.onClose) {
                        options.onClose(event, reason, key);
                    }
                    // Dispatch action to remove snackbar from redux store
                    this.props.removeSnackbar(key);
                },
                onClick: (event, reason, key) => {
                    this.props.closeSnackbar(key)
                    this.props.removeSnackbar(key);
                }
            });
            // Keep track of snackbars that we've displayed
            this.storeDisplayed(key);
        });
    }

    render() {
        return null;
    }
}

const mapStateToProps = store => ({
    notifications: store.notificationsSnake.notifications,
});

const mapDispatchToProps = dispatch => bindActionCreators({ removeSnackbar }, dispatch);

export default withSnackbar(connect(
    mapStateToProps,
    mapDispatchToProps,
)(Notifier));