/**
 * Created by johnuiterwyk on 2/23/16.
 */

import React from 'react';

import UserAction from "../../actions/UserAction";

class UserListRowView extends React.Component {
    constructor(props) {
        super(props);
    }
    editUser()
    {
        var user =
        {
            id: this.props.id,
            username: this.props.username,
            fullname: this.props.fullname,
            api_key: this.props.api_key,
            role: this.props.role
        };

        UserAction.loadUserForEdit(user);

    }
    deleteUser()
    {
        if(confirm("Are you sure you want to delete the user  " + this.props.fullname))
        {
            UserAction.deleteUser(this.props.id);
        }
    }
    render() {

        const actionStyle = {
            paddingLeft: "5px",
            paddingRight:"5px"
        };

        return (
            <li className="row user-list-row">
                <div className="col-sm-1">{this.props.id}</div>
                <div className="col-sm-2">{this.props.username}</div>
                <div className="col-sm-3">{this.props.fullname}</div>
                <div className="col-sm-1">{this.props.role}</div>
                <div className="col-sm-3 dont-break-out">{this.props.api_key}</div>
                <div className="col-sm-2" style={actionStyle}>
                    <button  onClick={this.editUser.bind(this)}>edit</button>
                    <button onClick={this.deleteUser.bind(this)}>delete</button>
                </div>
            </li>
        );
    }
}

export default UserListRowView;