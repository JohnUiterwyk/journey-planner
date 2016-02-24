/**
 * Created by johnuiterwyk on 2/22/16.
 */
import dispatcher from "../dispatchers/dispatcher";
import axios from "axios";
import ActionType from "../constants/ActionTypes";
import { hashHistory } from 'react-router'

class LoginAction {
    constructor() {

    }
    startLoginRequest (username, password){
        this.loginRequestSent();
        var that = this;
        axios.post('/api/sessions/',{username,password})
            .then(function (response) {
                //success
                that.loginSuccessReceived(response);
            })
            .catch(function (response) {
                //fail
                if(response.hasOwnProperty("data"))
                {
                    that.loginErrorReceived(response);

                }else
                {
                    console.log(response);
                }
            });
    }

    loginRequestSent()
    {
        console.log("loginRequestSent");
        dispatcher.dispatch({
            type: ActionType.LOGIN_REQUEST_SENT,
            data: null
        });

    }

    loginSuccessReceived(response)
    {
        console.log("loginSuccessReceived");
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.LOGIN_SUCCES_RECIEVED,
            currentUser: response.data.data
        });
        hashHistory.push("/");

    }

    loginErrorReceived(response)
    {
        console.log("loginErrorReceived");
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.LOGIN_ERROR_RECIEVED,
            errorMessage: response.data.data
        });

    }

    logout()
    {
        console.log("LoginAction.logout");
        localStorage.removeItem("currentUser");
        dispatcher.dispatch({
            type: ActionType.LOGOUT
        });
        hashHistory.push("/");

    }

}
export default new LoginAction;
