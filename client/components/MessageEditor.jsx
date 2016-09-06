import React from 'react';

import ColorPicker from './ColorPicker.jsx';

import './MessageEditor.less';

const MessageEditor = React.createClass({
    getInitialState() {
        return {
            from  : '',
            to    : '',
            text  : '',
            color : '#FFFFFF'
        };
    },


    handleFromChange(event) {
        this.setState({ from: event.target.value });
    },

    handleToChange(event) {
        this.setState({ to: event.target.value });
    },


    handleTextChange(event) {
        this.setState({ text: event.target.value });
    },

    handleColorChange(color) {
        this.setState({ color });
    },

    handleMessageSend() {
        const newMessage = {
            text  : this.state.text,
            from  : this.state.from,
            to    : this.state.to,
            color : this.state.color
        };

        this.props.onMessageSend(newMessage);
        this.setState({ text: '', from: '', to: '', title: '', color: '#FFFFFF' });
    },

    render() {
        return (
            <div className='MessageEditor'>
                <input
                    type='text'
                    className='MessageEditor__title from'
                    placeholder='Enter from'
                    value={this.state.from}
                    onChange={this.handleFromChange}
                />
                <input
                    type='text'
                    className='MessageEditor__title to'
                    placeholder='Enter to'
                    value={this.state.to}
                    onChange={this.handleToChange}
                />
                <textarea
                    placeholder='Enter message text'
                    rows={5}
                    className='MessageEditor__text'
                    value={this.state.text}
                    onChange={this.handleTextChange}
                />
                <div className='MessageEditor__footer'>
                    <ColorPicker
                        value={this.state.color}
                        onChange={this.handleColorChange}
                    />
                    <button
                        className='MessageEditor__button'
                        disabled={!this.state.text}
                        onClick={this.handleMessageSend}
                    >
                        Add
                    </button>
                </div>
            </div>
        );
    }
});

export default MessageEditor;
