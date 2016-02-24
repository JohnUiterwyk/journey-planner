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
import TripPrintMonthView from "../components/trip/TripPrintMonthView"

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
            TripAction.refreshAllTrips()
        }
    }
    getTrips() {
       this.setState(TripStore.getAll());
    }

    componentWillMount() {
       TripStore.on("change", this.getTrips.bind(this));
    }
    componentDidMount()
    {
        this.refreshTrips();
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
                <TripCreateView currentUser={this.props.currentUser} message={this.props.createErrorMessage} editMode={this.state.editMode}/>
                <TripFilterView filterString={this.state.filterString}/>
                <TripPrintMonthView trips={this.state.trips} currentUser={this.props.currentUser}  filterString={this.state.filterString}/>
                <TripListView trips={this.state.trips} currentUser={this.props.currentUser}  filterString={this.state.filterString}/>
            </div>

        );
    }
}

export default TripsViewController;
