import React from 'react';

const User = React.createClass({
    render() {
        return (
            <div className="User" onClick={this.props.onSelect}>
                <span>{this.props.children}</span>
            </div>
        );
    }
});

export default User;