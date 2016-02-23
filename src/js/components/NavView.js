import React from "react";
import { IndexLink, Link } from "react-router";
import LoginAction from "../actions/LoginAction"

class NavView extends React.Component {
  constructor() {
    super()
    this.state = {
      collapsed: true,
    };
  }

  toggleCollapse() {
    const collapsed = !this.state.collapsed;
    this.setState({collapsed});
  }
  logout(e)
  {
    e.preventDefault();
    LoginAction.logout();
  }

  getNavLinks()
  {
    const { location } = this.props;
    const tripsClass = location.pathname === "/" ? "active" : "";
    const usersClass = location.pathname.match(/^\/users/) ? "active" : "";
    const settingsClass = location.pathname.match(/^\/settings/) ? "active" : "";
    if (!this.props.authenticated) {
      return (
          <ul className="nav navbar-nav navbar-right">
            <li>
              <Link to="login">Login</Link>
            </li>
            <li>
              <Link to="signup">Signup</Link>
            </li>
          </ul>)
    } else {
      return (
          <ul className="nav navbar-nav navbar-right">
            <li class={tripsClass}>
              <IndexLink to="/" onClick={this.toggleCollapse.bind(this)}>Trips</IndexLink>
            </li>
            <li class={usersClass}>
              <Link to="Users" onClick={this.toggleCollapse.bind(this)}>Users</Link>
            </li>
            <li class={settingsClass}>
              <Link to="settings" onClick={this.toggleCollapse.bind(this)}>Settings</Link>
            </li>
            <li>
              <a onClick={this.logout.bind(this)}>Logout</a>
            </li>
          </ul>)
    }
  }

  render() {
    const { collapsed } = this.state;
    const navClass = collapsed ? "collapse" : "";

    return (
      <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
        <div class="container">
          <div class="navbar-header">
            <button type="button" class="navbar-toggle" onClick={this.toggleCollapse.bind(this)} >
              <span class="sr-only">Toggle navigation</span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
          </div>
          <div class={"navbar-collapse " + navClass} id="bs-example-navbar-collapse-1">
            {this.getNavLinks()}
          </div>
        </div>
      </nav>
    );
  }
}

  export default NavView;