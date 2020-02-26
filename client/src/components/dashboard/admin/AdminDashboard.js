import React, { Fragment } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TutorsList from './TutorsList';
import { Layout, Menu } from "antd";
const { Content, Sider } = Layout;

const AdminDashboard = () => {
    return (
        <>
        <h1>Test...</h1>
        <Sider>
            <Menu>
                <Menu.Item>
                    <Link to='/tutorslist'>
                        -Tutors List-
                    </Link>
                </Menu.Item>
            </Menu>
        </Sider>
        <Content>
            <Switch>
                <Route path="/tutorslist" component={TutorsList} />
            </Switch>
        </Content>
        </>
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