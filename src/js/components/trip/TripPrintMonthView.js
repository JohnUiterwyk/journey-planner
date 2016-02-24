/**
 * Created by johnuiterwyk on 2/24/16.
 */
/**
 * Created by johnuiterwyk on 2/23/16.
 */
import React from 'react';
import TripListRowView from './TripListRowView';
import moment from 'moment';

class TripPrintMonthView extends React.Component {

    handlePrintButton()
    {
        var content = document.getElementById("trip-printable-month-view");
        var pri = document.getElementById("hidden-print-iframe").contentWindow;

        pri.document.open();
        pri.document.write(content.innerHTML);
        pri.document.close();

        var cssLink = document.createElement("link")
        cssLink.href = "/assets/css/style.css";
        cssLink.rel = "stylesheet";
        cssLink.type = "text/css";
        pri.document.body.appendChild(cssLink);

        var bootstrapCssLink = document.createElement("link")
        bootstrapCssLink.href = "/assets/css/bootstrap.min.css";
        bootstrapCssLink.rel = "stylesheet";
        bootstrapCssLink.type = "text/css";
        pri.document.body.appendChild(bootstrapCssLink);

        pri.focus();
        pri.print();

    }
    render() {
        const trips= this.props.trips;
        var tripRows =[];
        for (var i = 0; i < trips.length; i++) {
        {
            var trip = trips[i];
            var startDate = moment(trip.start_date);
            var now = moment();
            var oneMonth = moment().add(1,'month');
            if(this.props.filterString === null
                || this.props.filterString === ""
                || trip.destination.toLowerCase().indexOf(this.props.filterString.toLowerCase()) > -1)
            {
                if (startDate >= now && startDate < oneMonth) {
                    tripRows.push(
                        <TripListRowView key={trip.id} {...trip} currentUser={this.props.currentUser}/>
                    );
                }
            }
        }}

        return (
            <div className="row trip-list-view">
                <h1>Next 30 Days </h1>
                <button className="btn btn-default" onClick={this.handlePrintButton.bind(this)}>Print</button>
                <div id="trip-printable-month-view">
                    <ul className="col-xs-12 list-unstyled trip-list">
                        <li className="row trip-list-row trip-list-header-row">
                            <div className="col-sm-1">Days away</div>
                            <div className="col-sm-1">User Id</div>
                            <div className="col-sm-2">Destination</div>
                            <div className="col-sm-2">Start Date</div>
                            <div className="col-sm-2">End Date</div>
                            <div className="col-sm-2">Comment</div>
                            <div className="col-sm-2 trip-action">Action</div>
                        </li>

                        {tripRows}
                    </ul>
                </div>

                <iframe id="hidden-print-iframe"></iframe>
            </div>
        );
    }
}

export default TripPrintMonthView;