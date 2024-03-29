import React, { Fragment } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import TutorSidebar from './TutorSidebar';
import MyLectures from './MyLectures';
import MyClassrooms from './MyClassrooms'
import HomeDashboard from '../HomeDashboard';
import MyClassroomInfo from './MyClassroomInfo';

const { Content, Sider } = Layout;

const TutorDashboard = () => {
    return (
        <Fragment>
            <Sider>
                <TutorSidebar />
            </Sider>
            <Content>
                <Switch>
                    <Route path="/dashboard/classroom/:id/info" component={MyClassroomInfo} />
                    <Route path="/dashboard/classroom/:id/lectures" component={MyLectures} />
                    <Route path="/dashboard/myClassrooms" component={MyClassrooms} />
                    <Route path='/dashboard' component={HomeDashboard} />
                </Switch>
            </Content>
        </Fragment>
    );
}


export default TutorDashboard;