import React,{Fragment} from 'react';
import {Layout} from 'antd';
import { Switch, Route } from 'react-router-dom';

import StudentSidebar from './StudentSidebar';
import MyLectures from './MyLectures';

const {Content,Sider} = Layout;

const StudentDashboard = () => {
    return(
        <Fragment>
            <Sider>
                <StudentSidebar/>
            </Sider>
            <Content>
                <Switch>
                    <Route path="/dashboard/myLectures" component={MyLectures}/>
                </Switch>
            </Content>
        </Fragment>
    )
}


export default StudentDashboard;