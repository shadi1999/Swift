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


const Routes = ({auth}) => {
    let privateRoutes = auth.loading ? null :
    <Fragment>
        <Route path='/dashboard' render={(props)=><MainDashboard {...props} userKind={auth.user.kind} />}/>
    </Fragment>

    return (
        <>
            <AlertWrapper />
            {/* <Skeleton active loading={loading}> */}
                <Switch>
                    {privateRoutes}
                    <Route path='/register/tutor' component={RegisterTutor} />
                    <Route path='/register/student' component={RegisterStudent} />
                    <Route path='/login' component={Login} />
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
  