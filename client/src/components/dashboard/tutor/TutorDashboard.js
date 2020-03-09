import React,{Fragment} from 'react';
import {Layout} from 'antd';
import { Switch, Route } from 'react-router-dom';

import TutorSidebar from './TutorSidebar';
import MyLectures from './MyLectures';

const {Content,Sider} = Layout;

const TutorDashboard = () => {
    return(
        <Fragment>
            <Sider>
                <TutorSidebar/>
            </Sider>
            <Content>
                <Switch>
                    <Route path="/dashboard/myLectures" component={MyLectures}/>
                </Switch>
            </Content>
        </Fragment>
    );
}


export default TutorDashboard;