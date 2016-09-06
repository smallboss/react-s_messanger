import React from 'react';
import Message from './Message.jsx';

import './MessagesWrapp.less';


const MessageWrapp = React.createClass({
    render() {
        return (
            <div className="MessagesWrapp" id="messagesWrapp">
                {
                    this.props.messages.map( message => {
                        if(message.to === this.props.selectedUser){
                            return(
                                <Message
                                    key={message.id}
                                    from={message.from}
                                    to={message.to}
                                    color={message.color}
                                    onDelete={this.props.onMessageDelete.bind(null, message)}
                                >
                                    {message.text}
                                </Message>
                            )
                        }
                    })
                }
            </div>
        );
    }
});

export default MessageWrapp;
