/**
 * Created by johnuiterwyk on 2/24/16.
 */
/**
 * Created by johnuiterwyk on 2/23/16.
 */
import React from 'react';
import UserListRowView from './UserListRowView';


class UserListView extends React.Component {

    render() {
        const users= this.props.users;

        var userRows =[];
        for (var i = 0; i < users.length; i++)
        {
            var user = users[i];
            userRows.push(
                <UserListRowView key={user.id} {...user} currentUser={this.props.currentUser}/>
            );
        }
        return (
            <div className="row user-list">
                <h1>All Users</h1>
                <ul className="col-xs-12 list-unstyled user-list">
                    <li className="row user-list-header-row">
                        <div className="col-sm-1">User Id</div>
                        <div className="col-sm-2">Username</div>
                        <div className="col-sm-3">Fullname</div>
                        <div className="col-sm-1">Role</div>
                        <div className="col-sm-3">Api Key</div>
                        <div className="col-sm-2">Action</div>
                    </li>

                    {userRows}
                </ul>
            </div>
        );
    }
}

export default UserListView;