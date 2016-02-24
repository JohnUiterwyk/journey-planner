/**
 * Created by johnuiterwyk on 2/23/16.
 */
import React from 'react';
import TripListRowView from './TripListRowView';


class TripListView extends React.Component {

    render() {
        const trips= this.props.trips;

        var tripRows =[];
        for (var i = 0; i < trips.length; i++) {
            {
                var trip = trips[i];

                if(this.props.filterString === null
                    || this.props.filterString === ""
                    || trip.destination.toLowerCase().indexOf(this.props.filterString.toLowerCase()) > -1)
                {
                    tripRows.push(
                        <TripListRowView  key={trip.id} {...trip} currentUser={this.props.currentUser} />
                    );
                }
            }}
        return (
            <div className="row trip-list">
                <h1>All Trips</h1>
                <ul className="col-xs-12 list-unstyled trip-list">
                    <li className="row trip-list-header-row">
                        <div className="col-sm-1">Days away</div>
                        <div className="col-sm-1">User Id</div>
                        <div className="col-sm-2">Destination</div>
                        <div className="col-sm-2">Start Date</div>
                        <div className="col-sm-2">End Date</div>
                        <div className="col-sm-2">Comment</div>
                        <div className="col-sm-2">Action</div>
                    </li>

                    {tripRows}
                </ul>
            </div>
        );
    }
}

export default TripListView;