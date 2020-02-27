import React from 'react';
import { Menu, Icon, Dropdown, Avatar } from 'antd';
// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Navbar = ({isAuthenticated, user, logout}) => {
    let welcome;
    const menu = (
        <Menu>
          <Menu.Item onClick={logout}>
              Log out
          </Menu.Item>
        </Menu>
    );

    if (isAuthenticated && user) {
        welcome =
        <>
        <div className="welcome-username">
        <Avatar icon="user" size="large" />
        <Dropdown overlay={menu}>
            <span>Welcome, {user.name}! <Icon type="down" /></span>
        </Dropdown>
        </div>
        </>
    }

    return (
    <>
        <div className="logo logo-placeholder"></div>
        {/* // <Menu
        //     theme="dark"
        //     mode="horizontal"
        //     defaultSelectedKeys={['2']}
        //     style={{ lineHeight: '64px' }}
        // >
        // </Menu> */}
        {welcome}
    </>
    )
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    name: PropTypes.string,
    logout: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
});

export default connect(mapStateToProps, {logout})(Navbar);