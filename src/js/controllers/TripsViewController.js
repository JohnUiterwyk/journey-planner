/**
 * Created by johnuiterwyk on 2/23/16.
 */
//
//
//
import React from "react";
import { Link } from "react-router";
import TripFilterView from "../components/trip/TripFilterView"
import TripListView from "../components/trip/TripListView"
import TripCreateView from "../components/trip/TripCreateView"

import TripStore from "../stores/TripStore"
import TripAction from "../actions/TripAction"

class TripsViewController extends React.Component
{
    constructor() {
        super();

        //set initial state directly when extending React.Component
        //use getInitialState hook when using React.createClass();
        this.state = {
            showTripCreateForm: false,
            trips: []
        };
    }

    refreshTrips()
    {
        if(this.props.currentUser)
        {
            TripAction.refreshAllTrips(this.props.currentUser.api_key,this.props.currentUser.id)
        }
    }
    getTrips() {
       this.setState(TripStore.getAll());
    }

    componentWillMount() {
        this.refreshTrips();
       TripStore.on("change", this.getTrips.bind(this));
    }

    componentWillUnmount() {
      TripStore.removeListener("change", this.getTrips.bind(this));
    }

    //toggleTripCreate()
    //{
    //    this.setState({showTripCreateForm:!this.state.showTripCreateForm});
    //}

    render() {

        return (
            <div id="TripViewController">
                <TripCreateView currentUser={this.props.currentUser} message={this.props.createErrorMessage}/>
                <TripFilterView/>
                <TripListView trips={this.state.trips} currentUser={this.props.currentUser} />
            </div>

        );
    }
}

export default TripsViewController;
