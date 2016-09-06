import React from 'react';

import User from './User.jsx';
import './UsersList.less';

const UsersList = React.createClass({
    render() {
        return (
            <div className="UsersList">
                {
                    this.props.users.map((user, i) => 
                        <User 
                            key={i}
                            onSelect={this.props.onChangeActiveUser.bind(null, user)}>
                            {user}
                        </User>
                    )
                }
            </div>
        );
    }
});

export default UsersList;