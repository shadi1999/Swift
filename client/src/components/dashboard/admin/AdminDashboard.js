import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useLocation,useParams} from "react-router";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TutorsList from './TutorsList';
import AddAdmin from './AddAdmin';
import { Layout, Menu } from "antd";
import AdminSidebar from './AdminSidebar';
import StudentsList from './StudentsList';
import EditTutor from './EditTutor';
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
                <Route path="/dashboard/admin/tutors" component={TutorsList} />
                <Route path="/dashboard/admin/tutor/:id" component={EditTutor} />
                <Route path="/dashboard/admin/addAdmin" component={AddAdmin} />
                <Route path="/dashboard/admin/students" component={StudentsList} />
                <Route path="/dashboard/admin/student/:id" component={<h1>Student</h1>} />
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