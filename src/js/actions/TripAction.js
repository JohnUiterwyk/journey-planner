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

    refreshAllTrips(apiKey, userId) {
        axios.get('/api/trips/user/' + userId + "?api_key=" + apiKey)
            .then(this.gotAllTrips.bind(this));

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
    createTrip(apiKey, current_user_id, user_id, destination, start_date, end_date, comment) {
        axios.post('/api/trips/'+ "?api_key=" + apiKey, {user_id, destination, start_date, end_date, comment})
            .then((function(response)
            {
                this.createSuccess(response);
                this.refreshAllTrips(apiKey,current_user_id)
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

    deleteTrip(apiKey, currentUserId, tripId) {
        axios.delete('/api/trips/'+tripId+ "?api_key=" + apiKey)
            .then((function(response)
            {
                dispatcher.dispatch({
                    type: ActionType.TRIP_DELETED,
                    message: response.data.data
                });
                this.refreshAllTrips(apiKey,currentUserId)
            }).bind(this))
    }

}
export default new TripAction;
