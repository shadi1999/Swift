import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../auth/Login';
import AlertWrapper from '../layout/Alert';
import AdminDashboard from '../dashboard/admin/AdminDashboard';
import TutorDashboard from '../dashboard/tutor/TutorDashboard';
import StudentDashboard from '../dashboard/student/StudentDashboard';
import RegisterTutor from '../auth/RegisterTutor';
import RegisterStudent from '../auth/RegisterStudent';
import PrivateRoute from './PrivateRoute';

const Routes = () => {
    return (
        <>
            <AlertWrapper />
            <Switch>
                <Route exact path='/register/tutor' component={RegisterTutor} />
                <Route exact path='/register/student' component={RegisterStudent} />
                <Route exact path='/login' component={Login} />
                <PrivateRoute userKind='Administrator' exact path='/dashboard/admin' component={AdminDashboard} />
                <PrivateRoute userKind='tutor' exact path='/dashboard/tutor' component={TutorDashboard} />
                <PrivateRoute userKind='student' exact path='/dashboard/student' component={StudentDashboard} />
            </Switch>
        </>
    )
}

export default Routes;