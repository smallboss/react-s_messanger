import React from 'react';

import ChatStore from '../stores/ChatStore';
import ChatActions from '../actions/ChatActions';

import MessageEditor from './MessageEditor.jsx';
import MessagesWrapp from './MessagesWrapp.jsx';
import UsersList from './UsersList.jsx';

import './App.less';

function getStateFromFlux() {
    return {
        isLoading: ChatStore.isLoading(),
        messages: ChatStore.getMessages(),
        selectedUser: ChatStore.getSelectedUser(),
        userName: ChatStore.getUserName()
    };
}

var T = ['kella', 'jeka', 'vova', 'all'];

const App = React.createClass({
    getInitialState() {
        return getStateFromFlux();
    },

    componentWillMount() {
        let userName = localStorage.getItem('userName');
        
        if(!userName){
            userName = prompt('Enter your username');
            localStorage.setItem('userName', userName);
        }

        ChatActions.setUserName(userName);

        ChatActions.loadMessages();
    },

    interval(){
        ChatActions.loadMessages();
        console.log('refresh');
    },

    componentDidMount() {
        ChatStore.addChangeListener(this._onChange);
        setInterval(this.interval, 5000);
    },

    componentWillUnmount() {
        ChatStore.removeChangeListener(this._onChange);
    },

    handleMessageDelete(message) {
        ChatActions.deleteMessage(message.id);
    },

    handleMessageSend(messageData) {
        messageData.from = this.state.selectedUser;
        messageData.to = this.state.selectedUser;
        ChatActions.createMessage(messageData);
    },

    handleChangeActiveUser(userName) {
        ChatActions.changeActiveUser(userName);
    },

    componentDidUpdate(){
        var element = document.getElementById('messagesWrapp');
        element.scrollTop = element.scrollHeight;
    },

    render() {
        //<h2 className='App__header'>MessagesApp</h2>
        return (
            <div className='App'>
                <div className="appInner">
                    <UsersList users={T} selectedUser={this.state.selectedUser} onChangeActiveUser={this.handleChangeActiveUser}/>
                    <div className='ChatSide'>
                        <MessagesWrapp 
                            messages={this.state.messages} 
                            selectedUser={this.state.selectedUser} 
                            onMessageDelete={this.handleMessageDelete} />
                        <MessageEditor onMessageSend={this.handleMessageSend} />
                    </div>
                </div>
            </div>
        );
    },

    _onChange() {
        this.setState(getStateFromFlux());
    }
});

export default App;
