import React, { Fragment } from 'react';
import { Switch, Route } from 'react-router-dom';

import TutorsList from './TutorsList';
import AddAdmin from './AddAdmin';
import { Layout } from "antd";
import AdminSidebar from './AdminSidebar';
import StudentsList from './StudentsList';
import EditTutor from './EditTutor';
import EditStudent from './EditStudent';
import HomeDashboard from '../HomeDashboard';
import AddClassroom from './AddClassroom';
import GetClassrooms from './GetClassrooms';
import EditClassroom from './EditClassroom';


const { Content, Sider } = Layout;

const AdminDashboard = () => {
    return (
        <Fragment>
            <Sider>
                <AdminSidebar />
            </Sider>
            <Content>
                {/* { content } */}
                <Switch>
                    <Route path="/dashboard/tutor/:id" component={EditTutor} />
                    <Route path="/dashboard/tutors" component={TutorsList} />
                    <Route path="/dashboard/addAdmin" component={AddAdmin} />
                    <Route path="/dashboard/student/:id" component={EditStudent} />
                    <Route path="/dashboard/students" component={StudentsList} />
                    <Route path="/dashboard/addClassroom" component={AddClassroom} />
                    <Route path="/dashboard/classrooms/:id" component={EditClassroom} />
                    <Route path="/dashboard/classrooms" component={GetClassrooms} />
                    <Route path='/dashboard' component={HomeDashboard} />
                </Switch>
            </Content>
        </Fragment>
    );
}

// Dashboard.propTypes = {
//     isAuthenticated: PropTypes.bool
// }

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// });

// export default connect(mapStateToProps)(Dashboard);
export default AdminDashboard;