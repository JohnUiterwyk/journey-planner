/**
 * Created by johnuiterwyk on 2/23/16.
 */
/**
 * Created by johnuiterwyk on 2/22/16.
 */
import { EventEmitter } from "events";

import dispatcher from "../dispatchers/dispatcher";

import ActionType from "../constants/ActionTypes";

class UserStore extends EventEmitter {
    constructor() {
        super();
        this.store = {
            users: [],
            editMode:
            {
                enabled: false,
                user:null,
                errorMessage:null
            },
            userFormErrorMessage:null,
            filterString:null
        }
    }

    getAll() {
        return this.store;
    }

    handleActions(action) {
        switch(action.type) {
            case ActionType.USER_LIST_GET_SUCCESS: {
                this.store.users = action.users;
                this.emit("change");
                break;
            }

            case ActionType.USER_CREATE_SUCCESS: {
                this.store.userFormErrorMessage = null;
                this.emit("change");
                break;
            }
            case ActionType.USER_CREATE_FAIL: {
                this.store.userFormErrorMessage = action.message;
                this.emit("change");
                break;
            }

            case ActionType.USER_LOAD_FOR_EDIT: {
                this.store.editMode.enabled = true;
                this.store.editMode.user = action.user;
                this.store.userFormErrorMessage = "";
                this.emit("change");
                break;
            }
            case ActionType.USER_CANCEL_EDIT: {
                this.store.editMode.enabled = false;
                this.store.editMode.user = null;
                this.store.userFormErrorMessage = null;
                this.emit("change");
                break;
            }
            case ActionType.USER_UPDATE_SUCCESS:{
                this.store.editMode.enabled = false;
                this.store.editMode.user = null;
                this.store.userFormErrorMessage = null;
                this.emit("change");
                break;
            }
            case ActionType.USER_UPDATE_FAIL:{
                this.store.userFormErrorMessage = action.message;
                this.emit("change");
                break;
            }

        }
    }

}

const userStore = new UserStore;
dispatcher.register(userStore.handleActions.bind(userStore));

export default userStore;
