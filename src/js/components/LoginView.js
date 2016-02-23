/**
 * Created by johnuiterwyk on 2/22/16.
 */
import React from "react";
import LoginAction from "../actions/LoginAction"
import LoginStore from "../stores/LoginStore"
import browserHistory from 'react-router'
import { RouterContext } from 'react-router'



class LoginView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state =
        {
            inputUsername : "",
            inputPassword : ""
        }
    }


    handleUsernameChange(e) {
        this.setState({inputUsername: e.target.value});
    }

    handlePasswordChange(e) {
        this.setState({inputPassword: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var username = this.state.inputUsername.trim();
        var password = this.state.inputPassword.trim();
        if (!username || !password) {
            return;
        }
        LoginAction.startLoginRequest(username, password);
    }
    render() {
        if(this.props.message && this.props.message !== "")
        {
            var alert =
                <div className="alert alert-danger">{this.props.message}
                </div>;
        }
        return (
        <div className="login jumbotron center-block">
            <h1>Login</h1>
            <form role="form"  onSubmit={this.handleSubmit.bind(this)}>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        placeholder="Your username"
                        value={this.state.inputUsername}
                        onChange={this.handleUsernameChange.bind(this)}
                        className="form-control"
                        id="username"
                        ref="username"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        value={this.state.inputPassword}
                        onChange={this.handlePasswordChange.bind(this)}
                        className="form-control"
                        id="password"
                        ref="password"
                        placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-default" >Submit</button>
            </form>

            {alert}
            <pre>
                {JSON.stringify(this.props, null, '\t')}
            </pre>
        </div>
        );
    }
}
LoginView.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default LoginView