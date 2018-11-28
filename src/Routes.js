import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from './containers/Login';
import Signup from './containers/Signup';
import SandBox from './SandBox'
import NewDraft from './containers/NewDraft'
import Draft from './components/Draft'
import NotFound from './components/NotFound';
import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) =>
    <Switch>
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        <AppliedRoute path="/login" exact component={Login} props={childProps} />
        <AppliedRoute path="/signup" exact component={Signup} props={childProps} />
        <AppliedRoute path="/newdraft" exact component={NewDraft} props={childProps} />
        <AppliedRoute path="/draft/:id" exact component={Draft} props={childProps} />
        {/* <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} /> */}
        <Route path='/sandbox' component={SandBox} />
        <Route component={NotFound} />
    </Switch>;