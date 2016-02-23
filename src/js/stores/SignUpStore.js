/**
 * Created by johnuiterwyk on 2/23/16.
 */
/**
 * Created by johnuiterwyk on 2/22/16.
 */
import { EventEmitter } from "events";

import dispatcher from "../dispatchers/dispatcher";

import ActionType from "../constants/ActionTypes";

class SignUpStore extends EventEmitter {
    constructor() {
        super();
        this.store = {
            signUpComplete: false,
            responseMessage: ""
        }
    }

    getAll() {
        return this.store;
    }

    handleActions(action) {
        switch(action.type) {
            case ActionType.SIGNUP_REQUEST_SENT:
            {
                this.store.signUpComplete = false;
                this.store.responseMessage = "Processing...";
                this.emit("change");
                break;
            }

            case ActionType.SIGNUP_SUCCES_RECIEVED: {
                this.store.signUpComplete = true;
                this.store.responseMessage = "";
                this.emit("change");
                break;
            }
            case ActionType.SIGNUP_ERROR_RECIEVED: {
                this.store.signUpComplete = false;
                this.store.responseMessage = action.errorMessage;
                this.emit("change");
                break;
            }

            case ActionType.SIGNUP_RESET: {
                this.store.signUpComplete = false;
                this.store.responseMessage = "";
                this.emit("change");
                break;
            }
        }
    }

}

const signUpStore = new SignUpStore;
dispatcher.register(signUpStore.handleActions.bind(signUpStore));

export default signUpStore;
