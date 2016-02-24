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

class TripAction {
    constructor() {
    }

    refreshAllTrips() {
        var user_api_key = localStorage.getItem("user_api_key");
        var user_id = localStorage.getItem("user_id");
        var user_role = localStorage.getItem("user_role");
        if(user_role >= 100)
        {
            axios.get('/api/trips/?api_key=' + user_api_key)
                .then(this.gotAllTrips.bind(this));
        }else
        {
            axios.get('/api/trips/user/' + user_id + "?api_key=" + user_api_key)
                .then(this.gotAllTrips.bind(this));
        }


    }


    gotAllTrips(response) {
        console.log(ActionType.TRIP_LIST_GET_SUCCESS);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.TRIP_LIST_GET_SUCCESS,
            trips: response.data.data
        });

    }

    //note we need to allow for all users
    createTrip(trip) {
        var user_api_key = localStorage.getItem("user_api_key");
        axios.post('/api/trips/'+ "?api_key=" + user_api_key, trip)
            .then((function(response)
            {
                this.createSuccess(response);
                this.refreshAllTrips()
            }).bind(this))
            .catch(this.createFail.bind(this));
    }

    createSuccess(response){
        console.log(ActionType.TRIP_CREATE_SUCCESS);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.TRIP_CREATE_SUCCESS,
            tripId: response.data.data
        });
    }
    createFail(response)
    {
        console.log(ActionType.TRIP_CREATE_FAIL);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.TRIP_CREATE_FAIL,
            message: response.data.data
        });
    }

    loadTripForEdit(trip)
    {
        console.log(ActionType.TRIP_LOAD_FOR_EDIT);
        dispatcher.dispatch({
            type: ActionType.TRIP_LOAD_FOR_EDIT,
            trip: trip
        });
    }

    cancelEdit()
    {
        console.log(ActionType.TRIP_CANCEL_EDIT);
        dispatcher.dispatch({
            type: ActionType.TRIP_CANCEL_EDIT
        });
    }

    saveEdit(trip)
    {
        console.log("TRIP_SAVE_EDIT");
        var user_api_key = localStorage.getItem("user_api_key");
        axios.put('/api/trips/'+ "?api_key=" + user_api_key, trip)
            .then(this.updateSuccess.bind(this))
            .catch(this.updateFail.bind(this));
    }
    updateSuccess(response)
    {
        console.log(ActionType.TRIP_UPDATE_SUCCESS);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.TRIP_UPDATE_SUCCESS
        });
        this.refreshAllTrips();
    }
    updateFail(response)
    {
        console.log(ActionType.TRIP_UPDATE_FAIL);
        console.log(response);
        dispatcher.dispatch({
            type: ActionType.TRIP_UPDATE_FAIL,
            message: response.data.data
        });
    }

    deleteTrip(tripId) {
        var user_api_key = localStorage.getItem("user_api_key");
        axios.delete('/api/trips/'+tripId+ "?api_key=" + user_api_key)
            .then((function(response)
            {
                dispatcher.dispatch({
                    type: ActionType.TRIP_DELETED,
                    message: response.data.data
                });
                this.refreshAllTrips();
            }).bind(this))
    }

    updateFilterString(filterString)
    {
        dispatcher.dispatch({
            type: ActionType.TRIP_FILTER_STRING_UPDATE,
            filterString: filterString
        });
    }

}
export default new TripAction;
