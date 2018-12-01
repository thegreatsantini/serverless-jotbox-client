import React from "react";
import { Route, Switch } from "react-router-dom";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Home from "./containers/Home";
import Login from './containers/Login';
import Signup from './containers/Signup';
import SandBox from './SandBox'
import NewDraft from './containers/NewDraft'
import Draft from './components/Draft'
import SearchUsers from './containers/SearchUsers'
import NotFound from './components/NotFound';
import AppliedRoute from './components/AppliedRoute';

export default ({ childProps }) =>
    <Switch>
        <UnauthenticatedRoute path="/login" exact component={Login} props={childProps} />
        <UnauthenticatedRoute path="/signup" exact component={Signup} props={childProps} />
        <AuthenticatedRoute path="/draft/new" exact component={NewDraft} props={childProps} />
        <AuthenticatedRoute path="/draft/:id" exact component={Draft} props={childProps} />
        <AuthenticatedRoute path="/search/users" exact component={SearchUsers} props={childProps} />
        <AppliedRoute path="/" exact component={Home} props={childProps} />
        {/* <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} /> */}
        <Route path='/sandbox' component={SandBox} />
        <Route component={NotFound} />
    </Switch>;