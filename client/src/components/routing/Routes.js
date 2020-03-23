import React, { Fragment, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../auth/Login';
import AlertWrapper from '../layout/Alert';
import AdminDashboard from '../dashboard/admin/AdminDashboard';
import TutorDashboard from '../dashboard/tutor/TutorDashboard';
import StudentDashboard from '../dashboard/student/StudentDashboard';
import RegisterTutor from '../auth/RegisterTutor';
import RegisterStudent from '../auth/RegisterStudent';
import PrivateRoute from './PrivateRoute';
import ErrorNotFound from '../ErrotNotFound';
import { Skeleton } from 'antd';
import MainDashboard from '../dashboard/MainDashboard';
import Classroom from '../classroom/Classroom';
import TutorClassroom from '../classroom/TutorClassroom';
import LoginAsGuest from '../auth/LoginAsGuest';

const Routes = ({ auth }) => {
    let privateRoutes = auth.loading ? null :
        <Route path='/dashboard' render={(props) => <MainDashboard {...props} userKind={auth.user.kind} />} />

    return (
        <>
            <AlertWrapper />
            {/* <Skeleton active loading={auth.loading}> */}
            <Switch>
                <Route path='/register/tutor' component={RegisterTutor} />
                <Route path='/register/student' component={RegisterStudent} />
                <Route path='/login/guest' component={LoginAsGuest} />
                <Route path='/login' component={Login} />
                <Skeleton active loading={auth.loading}>
                    <Route path='/classroom/:id/tutor' component={TutorClassroom} />
                    <Route exact path='/classroom/:id/' component={Classroom} />
                    {privateRoutes}
                </Skeleton>
                <Route component={ErrorNotFound} />
            </Switch>
            {/* </Skeleton> */}
        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Routes);
