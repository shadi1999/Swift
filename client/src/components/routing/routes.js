import React, { Fragment } from 'react';
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
import TutorsList from '../dashboard/admin/TutorsList';
import ErrorNotFound from '../ErrotNotFound';


const Routes = ({loading}) => {
    // TODO: add loading spinner instead of null...
    let privateRoutes = loading ? null :
    <Fragment>
        <PrivateRoute userKind='Administrator'  path='/dashboard/admin' component={AdminDashboard} />
        {/* <PrivateRoute userKind='Administrator' path='/dashboard/admin/:suburl' component={AdminDashboard} /> */}
        <PrivateRoute userKind='Tutor'  path='/dashboard/tutor' component={TutorDashboard} />
        <PrivateRoute userKind='Student'  path='/dashboard/student' component={StudentDashboard} />
    </Fragment>

    return (
        <>
            <AlertWrapper />
            <Switch>
                <Route exact path='/register/tutor' component={RegisterTutor} />
                <Route exact path='/register/student' component={RegisterStudent} />
                <Route exact path='/login' component={Login} />
                {privateRoutes}
                <Route  component={ErrorNotFound} />
            </Switch>
        </>
    )
}

const mapStateToProps = (state) => ({
    loading: state.auth.loading
})
  
export default connect(mapStateToProps)(Routes);
  