import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from './containers/Login'
import NotFound from './components/NotFound'
import AppliedRoute from './components/AppliedRoute'

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        {/* <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} /> */}
        <Route component={NotFound} />
    </Switch>;