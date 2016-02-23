/**
 * Created by johnuiterwyk on 2/23/16.
 */
import React from 'react';
import TripListRowView from './TripListRowView';


class TripListView extends React.Component {

    render() {
        const trips= this.props.trips;

        const TripListRowViews = trips.map((trip) => {
            return <TripListRowView  key={trip.id} {...trip} currentUser={this.props.currentUser} />;
        });
        return (
            <div className="row trip-filter-view ">
                <h1>Trips</h1>
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

                    {TripListRowViews}
                </ul>
            </div>
        );
    }
}

export default TripListView;