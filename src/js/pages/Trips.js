import React from "react";

import Trip from "../components/Trip";
import * as TripActions from "../actions/TripActions";
import TripStore from "../stores/TripStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getTrips = this.getTrips.bind(this);
    this.state = {
      trips: TripStore.getAll(),
    };
  }

  componentWillMount() {
    TripStore.on("change", this.getTrips);
  }

  componentWillUnmount() {
    TripStore.removeListener("change", this.getTrips);
  }

  getTrips() {
    this.setState({
      trips: TripStore.getAll(),
    });
  }

  reloadTrips() {
    TripActions.reloadTrips();
  }

  render() {
    const { trips } = this.state;

    const TripComponents = trips.map((trip) => {
        return <Trip key={trip.id} {...trip}/>;
    });

    return (
      <div>
        <button onClick={this.reloadTrips.bind(this)}>Reload!</button>
        <h1>Trips</h1>
        <ul>{TripComponents}</ul>
      </div>
    );
  }
}
