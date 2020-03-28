import React, { Fragment } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import StudentSidebar from './StudentSidebar';
import MyLectures from './MyLectures';
import MyClassrooms from './MyClassrooms';
import HomeDashboard from '../HomeDashboard';

const { Content, Sider } = Layout;

const StudentDashboard = () => {
    return (
        <Fragment>
            <Sider>
                <StudentSidebar />
            </Sider>
            <Content>
                <Switch>
                    <Route path="/dashboard/myLectures" component={MyLectures} />
                    <Route path="/dashboard/myClassrooms" component={MyClassrooms} />
                    <Route path='/dashboard' component={HomeDashboard} />
                </Switch>
            </Content>
        </Fragment>
    )
}


export default StudentDashboard;