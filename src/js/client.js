import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, IndexRoute,  hashHistory, browserHistory} from "react-router";

import AppViewController from "./pages/AppViewController";
import LoginView from "./components/LoginView";
import SignUpView from "./components/SignUpView";
import Home from "./components/Home";

const app = document.getElementById('app');


ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={AppViewController}>
        <IndexRoute component={Home}/>
        <Route path="login" component={LoginView}/>
        <Route path="signup" component={SignUpView}/>
    </Route>
  </Router>,
app);
