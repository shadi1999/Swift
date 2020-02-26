import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import AlertWrapper from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import Register from '../auth/Register';

const Routes = () => {
    return (
        <>
            <AlertWrapper />
            <Switch>
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/dashboard' component={Dashboard} />
            </Switch>
        </>
    )
}

export default Routes;