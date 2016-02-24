/**
 * Created by johnuiterwyk on 2/24/16.
 */
/**
 * Created by johnuiterwyk on 2/22/16.
 */
import React from "react";
//import UserAction from "../actions/UserAction"
//import UserStore from "../stores/UserStore"
import UserAction from "../../actions/UserAction";
import moment from "moment";


class UserCreateView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state =
        {
            user_id:null,
            role : null,
            username : null,
            password : null,
            fullname:null,
            api_key : null
        }
    }


    componentWillMount()
    {
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.editMode && nextProps.editMode.enabled)
        {
            this.setState({
                user_id:nextProps.editMode.user.id,
                role:nextProps.editMode.user.role,
                username:nextProps.editMode.user.username,
                fullname:nextProps.editMode.user.fullname,
                password:"",
                api_key:nextProps.editMode.user.api_key
            });
        }
        else
        {
            this.setState({
                user_id:null,
                role : null,
                username : null,
                password : null,
                fullname : null,
                api_key : null
            });
        }

    }

    handleUsernameChange(e) {
        this.setState({username: e.target.value});
    }
    handleFullnameChange(e){

        this.setState({fullname: e.target.value});
    }
    handleRoleChange(e) {

        this.setState({role: e.target.value});
    }
    handlePasswordChange(e) {

        this.setState({password: e.target.value});
    }
    handleApiKeyChange(e) {
        this.setState({api_key: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();

        var user =
        {
            id:this.state.user_id,
            role:this.state.role,
            username:this.state.username,
            password:this.state.password,
            fullname:this.state.fullname,
            api_key:this.state.api_key,
        };
        if (!user.username ) {
            return;
        }
        if(this.props.editMode && this.props.editMode.enabled)
        {
            UserAction.saveEdit(user);
        }else
        {
            UserAction.createUser(user);

        }
    }
    handleCancel()
    {
        this.setState({
            user_id:null,
            role : null,
            username : null,
            password : null,
            fullname:null,
            api_key : null
        });

        UserAction.cancelEdit();
    }

    render() {

        if(this.props.message && this.props.message !== "")
        {
            var alert =
                <div className="alert alert-danger row">{this.props.message}
                </div>;
        };
        var isDisabled  = (!this.props.currentUser || this.props.currentUser.role < 100);

        return (
            <div className="row">
                <form class="form"  onSubmit={this.handleSubmit.bind(this)}>


                    <div class="col-sm-2">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Your username"
                            value={this.state.username}
                            onChange={this.handleUsernameChange.bind(this)}
                            className="form-control"
                            id="username"
                            ref="username"
                        />
                    </div>
                    <div class="col-sm-2">
                        <label htmlFor="fullname">Fullname</label>
                        <input
                            type="text"
                            placeholder="Your fullname"
                            value={this.state.fullname}
                            onChange={this.handleFullnameChange.bind(this)}
                            className="form-control"
                            id="fullname"
                            ref="fullname"
                        />
                    </div>
                    <div class="col-sm-2">
                        <label htmlFor="role">Role</label>
                        <input
                            type="text"
                            placeholder="role"
                            value={this.state.role}
                            onChange={this.handleRoleChange.bind(this)}
                            className="form-control"
                            id="role"
                            ref="role"
                            disabled={isDisabled}
                        />
                    </div>
                    <div class="col-sm-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            placeholder="password"
                            value={this.state.password}
                            onChange={this.handlePasswordChange.bind(this)}
                            className="form-control"
                            id="password"
                            ref="password"
                        />
                    </div>
                    <div class="col-sm-2">
                        <label htmlFor="api_key">Api Key</label>
                        <input
                            type="text"
                            placeholder="api_key"
                            value={this.state.api_key}
                            onChange={this.handleApiKeyChange.bind(this)}
                            className="form-control"
                            id="api_key"
                            ref="api_key"
                        />
                    </div>


                    <div class="form-group col-sm-2">
                        <br/>
                        <button type="submit" class="btn btn-default">{this.props.editMode && this.props.editMode.enabled ? "Save" : "Create"}</button>
                        <button class="btn btn-default" onClick={this.handleCancel.bind(this)}>Cancel</button>
                    </div>
                </form>


                {alert}
            </div>
        );
    }
}
UserCreateView.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default UserCreateView