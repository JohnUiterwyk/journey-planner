/**
 * Created by johnuiterwyk on 2/23/16.
 */
/**
 * Created by johnuiterwyk on 2/22/16.
 */
import dispatcher from "../dispatchers/dispatcher";
import axios from "axios";
import ActionType from "../constants/ActionTypes";
import { hashHistory } from 'react-router'

class SignUpAction {
    constructor() {

    }
    startSignUpRequest (username, password,fullname){
        this.signUpRequestSent();
        var that = this;
        axios.post('/api/users/',{username,password,fullname})
            .then(function (response) {
                //success
                that.signUpSuccessReceived(response);
            })
            .catch(function (response) {
                //fail
                if(response.hasOwnProperty("data"))
                {
                    that.signUpErrorReceived(response);

                }else
                {
                    console.log(response);
                }
            });
    }

    signUpRequestSent()
    {
        console.log("loginRequestSent");
        dispatcher.dispatch({
            type: ActionType.SIGNUP_REQUEST_SENT,
            data: null
        });

    }

    signUpSuccessReceived(response)
    {
        console.log("loginSuccessReceived");
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.SIGNUP_SUCCES_RECIEVED
        });
        setTimeout(()=>{
            hashHistory.push("/login");
        },2000);

    }

    signUpErrorReceived(response)
    {
        console.log("loginErrorReceived");
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.SIGNUP_ERROR_RECIEVED,
            errorMessage: response.data.data
        });

    }


}
export default new SignUpAction;
