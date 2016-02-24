/**
 * Created by johnuiterwyk on 2/24/16.
 */
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

class UserAction {
    constructor() {
    }

    refreshAllUsers() {
        var user_api_key = localStorage.getItem("user_api_key");
        var user_id = localStorage.getItem("user_id");
        var current_user_role = localStorage.getItem("user_role");
        if(current_user_role >= 100)
        {
            axios.get('/api/users/?api_key=' + user_api_key)
                .then(this.gotAllUsers.bind(this));
        }


    }


    gotAllUsers(response) {
        console.log(ActionType.USER_LIST_GET_SUCCESS);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.USER_LIST_GET_SUCCESS,
            users: response.data.data
        });

    }

    createUser(user) {
        var user_api_key = localStorage.getItem("user_api_key");
        axios.post('/api/users/'+ "?api_key=" + user_api_key, user)
            .then((function(response)
            {
                this.createSuccess(response);
                this.refreshAllUsers()
            }).bind(this))
            .catch(this.createFail.bind(this));
    }

    createSuccess(response){
        console.log(ActionType.USER_CREATE_SUCCESS);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.USER_CREATE_SUCCESS,
            userId: response.data.data
        });
    }
    createFail(response)
    {
        console.log(ActionType.USER_CREATE_FAIL);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.USER_CREATE_FAIL,
            message: response.data.data
        });
    }

    loadUserForEdit(user)
    {
        console.log(ActionType.USER_LOAD_FOR_EDIT);
        dispatcher.dispatch({
            type: ActionType.USER_LOAD_FOR_EDIT,
            user: user
        });
    }

    cancelEdit()
    {
        console.log(ActionType.USER_CANCEL_EDIT);
        dispatcher.dispatch({
            type: ActionType.USER_CANCEL_EDIT
        });
    }

    saveEdit(user)
    {
        console.log("USER_SAVE_EDIT");
        var user_api_key = localStorage.getItem("user_api_key");
        axios.put('/api/users/'+ "?api_key=" + user_api_key, user)
            .then(this.updateSuccess.bind(this))
            .catch(this.updateFail.bind(this));
    }
    updateSuccess(response)
    {
        console.log(ActionType.USER_UPDATE_SUCCESS);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.USER_UPDATE_SUCCESS
        });
        this.refreshAllUsers();
    }
    updateFail(response)
    {
        console.log(ActionType.USER_UPDATE_FAIL);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.USER_UPDATE_FAIL,
            message: response.data.data
        });
    }

    deleteUser(userId) {
        var user_api_key = localStorage.getItem("user_api_key");
        axios.delete('/api/users/'+userId+ "?api_key=" + user_api_key)
            .then((function(response)
            {
                dispatcher.dispatch({
                    type: ActionType.USER_DELETED,
                    message: response.data.data
                });
                this.refreshAllUsers();
            }).bind(this))
    }


}
export default new UserAction;
