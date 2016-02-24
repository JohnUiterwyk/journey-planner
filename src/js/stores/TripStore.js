/**
 * Created by johnuiterwyk on 2/23/16.
 */
/**
 * Created by johnuiterwyk on 2/22/16.
 */
import { EventEmitter } from "events";

import dispatcher from "../dispatchers/dispatcher";

import ActionType from "../constants/ActionTypes";

class TripStore extends EventEmitter {
    constructor() {
        super();
        this.store = {
            trips: [],
            editMode:
            {
                enabled: false,
                trip:null,
                errorMessage:null
            },
            tripFormErrorMessage:null,
            filterString:null
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
        return this.store;
    }

    handleActions(action) {
        switch(action.type) {
            case ActionType.TRIP_LIST_GET_SUCCESS: {
                this.store.trips = action.trips;
                this.emit("change");
                break;
            }

            case ActionType.TRIP_CREATE_SUCCESS: {
                this.store.tripFormErrorMessage = null;
                this.emit("change");
                break;
            }
            case ActionType.TRIP_CREATE_FAIL: {
                this.store.tripFormErrorMessage = action.message;
                this.emit("change");
                break;
            }

            case ActionType.TRIP_LOAD_FOR_EDIT: {
                this.store.editMode.enabled = true;
                this.store.editMode.trip = action.trip;
                this.store.editMode.message = "";
                this.emit("change");
                break;
            }
            case ActionType.TRIP_CANCEL_EDIT: {
                this.store.editMode.enabled = false;
                this.store.editMode.trip = null;
                this.store.editMode.message = "";
                this.emit("change");
                break;
            }
            case ActionType.TRIP_UPDATE_SUCCESS:{
                this.store.editMode.enabled = false;
                this.store.editMode.trip = null;
                this.store.editMode.message = "";
                this.emit("change");
                break;
            }
            case ActionType.TRIP_UPDATE_FAIL:{
                this.store.editMode.message = action.message;
                this.emit("change");
                break;
            }

            case ActionType.TRIP_FILTER_STRING_UPDATE:{
                this.store.filterString = action.filterString;
                this.emit("change");
            }
        }
    }

}

const tripStore = new TripStore;
dispatcher.register(tripStore.handleActions.bind(tripStore));

export default tripStore;
