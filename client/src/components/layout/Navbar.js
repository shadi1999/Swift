import React, { Fragment } from 'react';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu, Dropdown, Avatar } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Logo from '../../logo.png';
import { Link, useHistory } from 'react-router-dom';
const Navbar = ({ isAuthenticated, user, logout }) => {
    const history = useHistory();
    let welcome;
    const onClick = () => {
        logout(history, '');
    }

    const menu = (
        <Fragment>
            <Menu>
                <Menu.Item onClick={onClick} >
                    Log out
          </Menu.Item>
                <Menu.Item >
                    <LegacyIcon name='user' type='user'></LegacyIcon>
                    My Profile
                    <Link to="/myProfile"></Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    );

    if (isAuthenticated && user) {
        welcome =
            <>
                <div className="welcome-username">
                    <Avatar icon={<LegacyIcon type="user" />} size="large" />
                    <Dropdown overlay={menu}>
                        <span>Welcome, {user.name}! <LegacyIcon type="down" /></span>
                    </Dropdown>
                </div>
            </>
    }

    return (
        <>
            <Link to=""><img src={Logo} alt="" className="logo-placeholder"></img></Link>
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

export default connect(mapStateToProps, { logout })(Navbar);