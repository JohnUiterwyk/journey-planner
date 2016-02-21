import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute,  } from "react-router";
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Users from "./pages/Users";
import Trips from "./pages/Trips";
import Layout from "./pages/Layout";
import Settings from "./pages/Settings";

const app = document.getElementById('app');


ReactDOM.render(
  <Router history={createBrowserHistory()}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Trips}></IndexRoute>
      <Route path="users" component={Users}></Route>
      <Route path="settings" component={Settings}></Route>
    </Route>
  </Router>,
app);
