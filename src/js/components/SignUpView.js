/**
 * Created by johnuiterwyk on 2/23/16.
 */
/**
 * Created by johnuiterwyk on 2/22/16.
 */
import React from "react";

import SignUpStore from "../stores/SignUpStore";
import SignUpAction from "../actions/SignUpAction"


class SignUpView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state =
        {
            signUpComplete: false,
            responseMessage: "",
            inputUsername : "",
            inputFullname : "",
            inputPassword : ""
        }
    }

    getSignupState() {
        this.setState(SignUpStore.getAll());
    }

    componentWillMount() {
        SignUpStore.on("change", this.getSignupState.bind(this));
    }

    componentWillUnmount() {
        SignUpStore.removeListener("change", this.getSignupState.bind(this));
    }

    handleUsernameChange(e) {
        this.setState({inputUsername: e.target.value});
    }

    handleFullnameChange(e) {
        this.setState({inputFullname: e.target.value});
    }
    handlePasswordChange(e) {
        this.setState({inputPassword: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var username = this.state.inputUsername.trim();
        var fullname = this.state.inputFullname.trim();
        var password = this.state.inputPassword.trim();
        if (!username || !password || !fullname) {
            return;
        }
        SignUpAction.startSignUpRequest(username, password, fullname);
    }
    render() {
        var form;
        if(this.state.signUpComplete === false)
        {
            form =
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
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Full name</label>
                        <input
                            type="text"
                            placeholder="Your full name"
                            value={this.state.inputFullname}
                            onChange={this.handleFullnameChange.bind(this)}
                            className="form-control"
                            id="fullname"
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
                            placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-default" >Submit</button>
                </form>;
        }else
        {
            form =
                <div className="alert alert-success">
                    Sign up complete! You will now be redirected to the login form.
                </div>
        }

        if(this.state.responseMessage && this.state.responseMessage !== "")
        {
           var alert =
               <div className="alert alert-danger">{this.props.message}
                </div>;
        }

        return (
            <div className="signup jumbotron center-block">
                <h1>Sign Up</h1>
                {form}
                {alert}
            <pre>
                {JSON.stringify(this.state, null, '\t')}
            </pre>
            </div>
        );
    }
}
SignUpView.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default SignUpView