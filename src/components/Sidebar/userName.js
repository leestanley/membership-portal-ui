import React, { PropTypes } from 'react'

class UserName extends React.Component {
    render () {
        return (
            <div>
                <h3 className="side-tag username Display-2White">{this.props.userName}</h3>
            </div>
        );
    }
};

export default UserName;
