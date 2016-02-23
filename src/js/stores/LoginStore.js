/**
 * Created by johnuiterwyk on 2/22/16.
 */
import { EventEmitter } from "events";

import dispatcher from "../dispatchers/dispatcher";

import ActionType from "../constants/ActionTypes";

class LoginStore extends EventEmitter {
    constructor() {
        super();
        this.status = {
            authenticated: false,
            pending: false,
            message: "",
            currentUser: null

            //this.currentUser = {
            //        id: 1,
            //        username: "john",
            //        fullname: "John Uiterwyk",
            //        role: 100,
            //        api_key: "4ef018808d581dec89cea8758d64ea1e4383c09f"
            //    };
        }
    }

    getAll() {
        return this.status;
    }

    handleActions(action) {
        switch(action.type) {
            case ActionType.LOGIN_REQUEST_SENT: {
                this.status.currentUser = null;
                this.status.authenticated = false;
                this.status.pending = true;
                this.emit("change");
                break;
            }

            case ActionType.LOGIN_SUCCES_RECIEVED: {
                this.status.currentUser = action.currentUser;
                this.status.authenticated = true;
                this.status.pending = false;
                this.emit("change");
                break;
            }
            case ActionType.LOGIN_ERROR_RECIEVED: {
                this.status.currentUser = null;
                this.status.authenticated = false;
                this.status.pending = false;
                this.status.message = action.errorMessage;
                this.emit("change");
                break;
            }
            case ActionType.LOGOUT: {
                this.status.currentUser = null;
                this.status.authenticated = false;
                this.status.pending = false;
                this.emit("change");
                break;
            }
        }
    }

}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;
