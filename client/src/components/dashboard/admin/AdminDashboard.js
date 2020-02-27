import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { useLocation,useParams} from "react-router";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TutorsList from './TutorsList';
import AddAdmin from './AddAdmin';
import { Layout, Menu } from "antd";
import AdminSidebar from './AdminSidebar';
const { Content, Sider } = Layout;

const AdminDashboard = () => {
    let { suburl } = useParams();

    let content;
    switch (suburl) {
        case 'tutors':
            content = <TutorsList/>
            break;
        case 'addAdmin':
            content = <AddAdmin/>
            break;
        case 'tutor':
            content = <h1>Tutor </h1>
            break;
        default:
            content = <h1>default </h1>
            break;
    }
    
    return (
        <Fragment>
        <Sider>
            <AdminSidebar />
        </Sider>
        <Content>
            { content }
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