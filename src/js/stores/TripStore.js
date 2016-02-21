import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TripStore extends EventEmitter {
  constructor() {
    super()
    this.trips = [
      {
        id: 113464613,
        text: "Paris",
        complete: false
      },
      {
        id: 235684679,
        text: "London",
        complete: false
      },
    ];
  }

  createTrip(text) {
    const id = Date.now();

    this.trips.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  getAll() {
    return this.trips;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_TRIP": {
        this.createTrip(action.text);
      }
      case "RECEIVE_TRIPS": {
        this.trips = action.trips;
        this.emit("change");
      }
    }
  }

}

const tripStore = new TripStore;
dispatcher.register(tripStore.handleActions.bind(tripStore));

export default tripStore;
