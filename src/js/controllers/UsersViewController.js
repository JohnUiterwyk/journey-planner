/**
 * Created by johnuiterwyk on 2/23/16.
 */
//
//
//
import React from "react";
import { Link } from "react-router";
import UserListView from "../components/user/UserListView"
import UserCreateView from "../components/user/UserCreateView"

import UserStore from "../stores/UserStore"
import UserAction from "../actions/UserAction"

class UsersViewController extends React.Component
{
  constructor() {
    super();

    //set initial state directly when extending React.Component
    //use getInitialState hook when using React.createClass();
    this.state = {
      showUserCreateForm: false,
      users: []
    };
  }

  refreshUsers()
  {
    if(this.props.currentUser)
    {
      UserAction.refreshAllUsers()
    }
  }
  getUsers() {
    this.setState(UserStore.getAll());
  }

  componentWillMount() {
    UserStore.on("change", this.getUsers.bind(this));
  }
  componentDidMount()
  {
    this.refreshUsers();
  }

  componentWillUnmount() {
    UserStore.removeListener("change", this.getUsers.bind(this));
  }

  //toggleUserCreate()
  //{
  //    this.setState({showUserCreateForm:!this.state.showUserCreateForm});
  //}

  render() {

    return (
        <div id="UserViewController">
          <UserCreateView currentUser={this.props.currentUser} message={this.props.userFormErrorMessage} editMode={this.state.editMode}/>
          <UserListView users={this.state.users} currentUser={this.props.currentUser}/>
        </div>

    );
  }
}

export default UsersViewController;
