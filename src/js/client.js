import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute,  hashHistory, browserHistory} from "react-router";

import AppViewController from "./pages/AppViewController";
import LoginView from "./components/LoginView";
import SignUpView from "./components/SignUpView";
import HomeView from "./components/HomeView";

const app = document.getElementById('app');


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppViewController}>
        <IndexRoute component={HomeView}/>
        <Route path="login" component={LoginView}/>
        <Route path="signup" component={SignUpView}/>
    </Route>
  </Router>,
app);
