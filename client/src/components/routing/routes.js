import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import AlertWrapper from '../layout/AlertWrapper';

const Routes = () => {
    return (
        <AlertWrapper />
        <Switch>
            <Route exact path='/login' component={Login} />
        </Switch>
    )
}

export default Routes;