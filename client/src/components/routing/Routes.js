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

const Routes = ({auth}) => {
    let privateRoutes = auth.loading ? null :
        <Route path='/dashboard' render={(props)=><MainDashboard {...props} userKind={auth.user.kind} />}/>

    return (
        <>
            <AlertWrapper />
            {/* <Skeleton active loading={auth.loading}> */}
            <Switch>
                <Route path='/register/tutor' component={RegisterTutor} />
                <Route path='/register/student' component={RegisterStudent} />
                <Route path='/login' component={Login} />
                <Skeleton active loading={auth.loading}>
                {privateRoutes}
                <Route path='/classroom/:id/tutor' component={TutorClassroom} />
                <Route path='/classroom/:id' component={Classroom} />
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
