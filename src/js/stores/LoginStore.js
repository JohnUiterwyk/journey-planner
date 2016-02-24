/**
 * Created by johnuiterwyk on 2/22/16.
 */
import { EventEmitter } from "events";

import dispatcher from "../dispatchers/dispatcher";

import ActionType from "../constants/ActionTypes";

class LoginStore extends EventEmitter {
    constructor() {
        super();
        this.store = {
            authenticated: false,
            pending: false,
            message: "",
            currentUser: null
        };
        if(localStorage.getItem("user_id") !== null)
        {
            this.store.currentUser = {
                id:localStorage.getItem("user_id"),
                username:localStorage.getItem("user_username"),
                fullname:localStorage.getItem("user_fullname"),
                role:localStorage.getItem("user_role"),
                api_key:localStorage.getItem("user_api_key")
            }
            this.store.authenticated = true;
        }

    }

    getAll() {
        return this.store;
    }

    handleActions(action) {
        switch(action.type) {
            case ActionType.LOGIN_REQUEST_SENT: {
                this.store.currentUser = null;
                this.store.authenticated = false;
                this.store.pending = true;
                this.emit("change");
                break;
            }

            case ActionType.LOGIN_SUCCES_RECIEVED: {

                localStorage.setItem("user_api_key", action.currentUser.api_key);
                localStorage.setItem("user_id", action.currentUser.id);
                localStorage.setItem("user_role", action.currentUser.role);
                localStorage.setItem("user_username", action.currentUser.username);
                localStorage.setItem("user_fullname", action.currentUser.fullname);
                
                this.store.currentUser = action.currentUser;
                this.store.authenticated = true;
                this.store.pending = false;
                this.emit("change");
                break;
            }
            case ActionType.LOGIN_ERROR_RECIEVED: {
                this.store.currentUser = null;
                this.store.authenticated = false;
                this.store.pending = false;
                this.store.message = action.errorMessage;
                this.emit("change");
                break;
            }
            case ActionType.LOGOUT: {

                localStorage.setItem("user_api_key", null);
                localStorage.setItem("user_id", null);
                localStorage.setItem("user_role", null);
                localStorage.setItem("user_username", null);
                localStorage.setItem("user_fullname", null);

                this.store.currentUser = null;
                this.store.authenticated = false;
                this.store.pending = false;
                this.emit("change");
                break;
            }
        }
    }

}

const loginStore = new LoginStore;
dispatcher.register(loginStore.handleActions.bind(loginStore));

export default loginStore;
