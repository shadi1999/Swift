import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Login from '../auth/Login';
import AlertWrapper from '../layout/Alert';
import RegisterTutor from '../auth/RegisterTutor';
import RegisterStudent from '../auth/RegisterStudent';
import ErrorNotFound from '../ErrotNotFound';
import { Skeleton } from 'antd';
import MainDashboard from '../dashboard/MainDashboard';
import Classroom from '../classroom/Classroom';
import TutorClassroom from '../classroom/TutorClassroom';
import LoginAsGuest from '../auth/LoginAsGuest';
import Home from '../Home';
import Profile from '../layout/Profile';

const Routes = ({ auth }) => {
    let privateRoutes = auth.loading ? null :
        <Route path='/dashboard' render={(props) => <MainDashboard {...props} userKind={auth.user.kind} />} />

    return (
        <>

            <Skeleton active loading={auth.loading && auth.user !== null}>
                <AlertWrapper />

                <Switch>
                    <Route path='/myProfile' component={Profile} />
                    <Route path='/register/tutor' component={RegisterTutor} />
                    <Route path='/register/student' component={RegisterStudent} />
                    <Route path='/login/guest' component={LoginAsGuest} />
                    <Route path='/login' component={Login} />
                    <Route path='/classroom/:id/tutor' component={TutorClassroom} />
                    <Route exact path='/classroom/:id/' component={Classroom} />
                    {privateRoutes}
                    <Route exact path="/" component={Home} />
                    <Route component={ErrorNotFound} />
                </Switch>
            </Skeleton>

        </>
    )
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(Routes);
