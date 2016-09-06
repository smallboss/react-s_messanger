import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/AppConstants';

import api from '../api';

const ChatActions = {
    loadMessages() {
        AppDispatcher.dispatch({
            type: Constants.LOAD_MESSAGES_REQUEST
        });

        api.listMessages()
        .then(({ data }) =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_MESSAGES_SUCCESS,
                messages: data
            })
        )
        .catch(err =>
            AppDispatcher.dispatch({
                type: Constants.LOAD_MESSAGES_FAIL,
                error: err
            })
        );
    },

    createMessage(message) {
        api.createMessage(message)
        .then(() =>
            this.loadMessages()
        )
        .catch(err =>
            console.error(err)
        );
    },

    deleteMessage(messageId) {
        api.deleteMessage(messageId)
        .then(() =>
            this.loadMessages()
        )
        .catch(err =>
            console.error(err)
        );
    },

    changeActiveUser(userName) {
        AppDispatcher.dispatch({
            type: Constants.CHANGE_ACTIVE_USER,
            selectedUser: userName
        });
    },

    setUserName(userName) {
        AppDispatcher.dispatch({
            type: Constants.SET_USER_NAME,
            userName: userName
        });
    }
};

export default ChatActions;
