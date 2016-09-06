import { EventEmitter } from 'events';

import AppDispatcher from '../dispatcher/AppDispatcher';
import AppConstants from '../constants/AppConstants';

const CHANGE_EVENT = 'change';

let _messages = [];
let _selectedUser = 'all';
let _userName = null;
let _loadingError = null;
let _isLoading = true;

function formatMessage(message) {
    console.log(_userName + " US");
    return {
        id    : message._id,
        from  : _userName,
        to    : message.to,
        text  : message.text,
        color : message.color || '#ffffff',
        time  : message.time
    };
}

const TasksStore = Object.assign({}, EventEmitter.prototype, {
    isLoading() { return _isLoading; },

    getMessages() { return _messages; },

    getSelectedUser() { return _selectedUser; },

    getUserName() { return _userName; },

    emitChange: function() { this.emit(CHANGE_EVENT); },

    addChangeListener: function(callback) { this.on(CHANGE_EVENT, callback); },

    removeChangeListener: function(callback) { this.removeListener(CHANGE_EVENT, callback); }
});

AppDispatcher.register(function(action) {
    switch(action.type) {
        case AppConstants.LOAD_MESSAGES_REQUEST: {
            _isLoading = true;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_MESSAGES_SUCCESS: {
            _isLoading = false;
            _messages = action.messages.map( formatMessage );
            _loadingError = null;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.LOAD_MESSAGES_FAIL: {
            _loadingError = action.error;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.CHANGE_ACTIVE_USER: {
            _selectedUser = action.selectedUser;

            TasksStore.emitChange();
            break;
        }

        case AppConstants.SET_USER_NAME: {
            _userName = action.userName;

            TasksStore.emitChange();
            break;
        }

        default: {
            console.log('No such handler ' + action.type);
        }
    }
});

export default TasksStore;
