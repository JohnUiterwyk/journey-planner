import React from "react";
import { Link } from "react-router";

import FooterView from "../components/FooterView";
import NavView from "../components/NavView";

import LoginStore from "../stores/LoginStore";
import LoginAction from "../actions/LoginAction"


class AppViewController extends React.Component
{
  constructor() {
    super();

    //set initial state directly when extending React.Component
    //use getInitialState hook when using React.createClass();
    this.state = {
      authenticated: false,
      currentUser:null
    };
  }

  getLoginState() {
    this.setState(LoginStore.getAll());

    /**
     * START DEBUG AUTO LOGIN
     */
    //if(true)
    //{
    //  this.setState({
    //    currentUser:{
    //      id: 6,
    //      role: 100,
    //      fullname: "john 3",
    //      username: "john3",
    //      api_key: "1234"
    //    },
    //    authenticated:true
    //  });
    //}
    /**
     * END DEBUG AUTO LOGIN
     */
  }

  componentWillMount() {
    this.getLoginState();
    LoginStore.on("change", this.getLoginState.bind(this));
  }

  componentWillUnmount() {
    LoginStore.removeListener("change", this.getLoginState.bind(this));
  }
  isLoggedIn()
  {
    return this.state.authenticated;
  }

  render() {
    const { location } = this.props;
    const {authenticated} = this.state;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>

        <NavView location={location} authenticated={authenticated} currentUser={this.state.currentUser}/>

        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-xs-12">

              {React.cloneElement(this.props.children, {currentUser: this.state.currentUser,authenticated:this.state.authenticated, message:this.state.message})}

            </div>
          </div>
          <FooterView/>
        </div>
      </div>

    );
  }
}

export default AppViewController;
