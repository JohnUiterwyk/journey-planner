/**
 * Created by johnuiterwyk on 2/22/16.
 */
import React from "react";
//import TripAction from "../actions/TripAction"
//import TripStore from "../stores/TripStore"
var DatePicker = require('react-datepicker');
import TripAction from "../../actions/TripAction";
import moment from "moment";


class TripCreateView extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state =
        {
            destination : "",
            startDate : null,
            endDate : null,
            comment : "",
            user_id : null
        }
    }


    componentWillMount()
    {
        if(this.props.currentUser)
        {
            this.setState({user_id:this.props.currentUser.id});
        }
    }
    handleUserIdChange(e) {
        this.setState({user_id: e.target.value});
    }
    handleDestinationChange(e) {
        this.setState({destination: e.target.value});
    }
    handleStartDateChange(startDate) {
        this.setState({startDate});
        if(startDate > this.state.endDate)
        {
            this.setState({endDate:startDate});
        }
    }
    handleEndDateChange(endDate) {

        this.setState({endDate});
        if(endDate < this.state.startDate)
        {
            this.setState({startDate:endDate});
        }
    }
    handleCommentChange(e) {
        this.setState({comment: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        var apiKey = this.props.currentUser.api_key;

        var destination = this.state.destination;
        var startDate = moment(this.state.startDate).format('YYYY-MM-DD');
        var endDate = moment(this.state.endDate).format('YYYY-MM-DD');
        var comment = this.state.comment;
        var userId = this.state.user_id;
        var currentUserId = this.props.currentUser.id;

        if (!destination || !startDate || !user_id) {
            return;
        }
        TripAction.createTrip(apiKey,currentUserId,userId,destination, startDate,endDate,comment);
    }
    render() {
        if(this.props.message && this.props.message !== "")
        {
            var alert =
                <div className="alert alert-danger col-sm-12">{this.props.message}
                </div>;
        }
        var isDisabled  = (!this.props.currentUser || this.props.currentUser.role < 100)

        return (
            <div className="row">
                <form class="form"  onSubmit={this.handleSubmit.bind(this)}>

                    <div class="col-sm-1">
                        <label htmlFor="user_id">User Id</label>
                        <input
                            type="text"
                            value={this.state.user_id}
                            onChange={this.handleUserIdChange.bind(this)}
                            className="form-control"
                            id="user_id"
                            ref="user_id"
                            disabled={isDisabled}
                        />
                    </div>

                    <div class="col-sm-2">
                        <label htmlFor="destination">Destination</label>
                        <input
                            type="text"
                            placeholder="Your destination"
                            value={this.state.destination}
                            onChange={this.handleDestinationChange.bind(this)}
                            className="form-control"
                            id="destination"
                            ref="destination"
                        />
                    </div>
                    <div class="col-sm-2 col-lg-2">
                        <label htmlFor="start-date">Start Date</label>
                        <DatePicker
                            selected={this.state.startDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleStartDateChange.bind(this)} />
                    </div>
                    <div class="col-sm-2 col-lg-2">
                        <label htmlFor="end-date">End Date</label>
                        <DatePicker
                            selected={this.state.endDate}
                            startDate={this.state.startDate}
                            endDate={this.state.endDate}
                            onChange={this.handleEndDateChange.bind(this)} />
                    </div>
                    <div class="col-sm-2">
                        <label htmlFor="comment">Comment</label>
                        <input
                            type="text"
                            placeholder="Your comment"
                            value={this.state.comment}
                            onChange={this.handleCommentChange.bind(this)}
                            className="form-control"
                            id="destination"
                            ref="destination"
                        />
                    </div>
                    <div class="form-group col-sm-1">
                        <div>&nbsp;</div>
                    <button type="submit" class="btn btn-default">{this.props.editMode ? "Edit" : "Create"}</button>
                    </div>
                </form>


                {alert}
            </div>
        );
    }
}
TripCreateView.contextTypes = {
    router: React.PropTypes.object.isRequired
};
export default TripCreateView