import React from 'react';

import './Message.less';

const Message = React.createClass({
    render() {
        const style = { backgroundColor: this.props.color };

        return (
            <div className='Message' style={style}>
                <span className='Message__del-icon' onClick={this.props.onDelete}> × </span>
                <h6 className='Message__from-to'>message from: {this.props.from} -> to: {this.props.to}</h6>
                <div className='Message__text'>{this.props.children}</div>
            </div>
        );
    }
});

export default Message;
