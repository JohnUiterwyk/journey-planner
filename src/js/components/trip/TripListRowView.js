/**
 * Created by johnuiterwyk on 2/23/16.
 */
/**
 * Created by johnuiterwyk on 2/23/16.
 */
/**
 * Created by johnuiterwyk on 2/23/16.
 */
import React from 'react';
import moment from 'moment';

import TripAction from "../../actions/TripAction";

class TripListRowView extends React.Component {
    constructor(props) {
        super(props);
    }
    getDayCount()
    {
        var now = moment();
        var start = moment(this.props.start_date);
        if(now < start)
        {
            return moment.duration(now.diff(start)).humanize();
        }
    }
    editTrip()
    {

    }
    deleteTrip()
    {
        if(confirm("Are you sure you want to delete the trip to " + this.props.destination))
        {
            TripAction.deleteTrip(this.props.currentUser.api_key,this.props.currentUser.id, this.props.id);
        }
    }
    render() {
        const tripId = this.props.id;
        const userId = this.props.user_id;
        const destination = this.props.destination;
        const startDate = this.props.start_date;
        const endDate = this.props.end_date;
        const comment = this.props.comment;

        const actionStyle = {
            paddingLeft: "5px",
            paddingRight:"5px"
        };

        return (
            <li className="row trip-list-row">
                <div className="col-xs-1">{this.getDayCount()}</div>
                <div className="col-xs-1">{userId}</div>
                <div className="col-xs-2">{destination}</div>
                <div className="col-xs-2">{startDate}</div>
                <div className="col-xs-2">{endDate}</div>
                <div className="col-xs-2">{comment}</div>
                <div className="col-xs-2" style={actionStyle}>
                    <button  onClick={this.editTrip.bind(this)}>edit</button>
                    <button onClick={this.deleteTrip.bind(this)}>delete</button>
                </div>
            </li>
        );
    }
}

export default TripListRowView;