import dispatcher from "../dispatcher";

export function createTrip(destination) {
  dispatcher.dispatch({
    type: "CREATE_TRIP",
    destination,
  });
}

export function deleteTrip(id) {
  dispatcher.dispatch({
    type: "DELETE_TRIP",
    id,
  });
}

export function reloadTrips() {
  // axios("http://someurl.com/somedataendpoint").then((data) => {
  //   console.log("got the data!", data);
  // })
  dispatcher.dispatch({type: "FETCH_TRIPS"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_TRIPS", trips: [
      {
        id: 8484848484,
        text: "Mexico",
        complete: false
      },
      {
        id: 6262627272,
        text: "Had Rin",
        complete: true
      },
    ]});
  }, 1000);
}
