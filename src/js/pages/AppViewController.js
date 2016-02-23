import React from "react";
import { Link } from "react-router";

import Footer from "../components/Footer";
import Nav from "../components/Nav";

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
  }

  componentWillMount() {
    this.getLoginState();
    LoginStore.on("change", this.getLoginState.bind(this));
  }

  componentWillUnmount() {
    LoginStore.removeListener("change", this.getLoginState.bind(this));
  }

  render() {
    const { location } = this.props;
    const {authenticated} = this.state;
    const containerStyle = {
      marginTop: "60px"
    };

    return (
      <div>

        <Nav location={location} authenticated={authenticated}/>

        <div class="container" style={containerStyle}>
          <div class="row">
            <div class="col-lg-12">

              {React.cloneElement(this.props.children, {currentUser: this.state.currentUser,authenticated:this.state.authenticated, message:this.state.message})}

            </div>
          </div>
          <Footer/>
        </div>
      </div>

    );
  }
}

export default AppViewController;
