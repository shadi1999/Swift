import React, { Fragment } from 'react';
import { Layout } from 'antd';
import { Switch, Route } from 'react-router-dom';

import TutorSidebar from './TutorSidebar';
import MyLectures from './MyLectures';
import MyClassrooms from './MyClassrooms'

const { Content, Sider } = Layout;

const TutorDashboard = () => {
    return (
        <Fragment>
            <Sider>
                <TutorSidebar />
            </Sider>
            <Content>
                <Switch>
                    <Route path="/dashboard/myLectures" component={MyLectures} />
                    <Route path="/dashboard/myClassrooms" component={MyClassrooms} />
                </Switch>
            </Content>
        </Fragment>
    );
}


export default TutorDashboard;