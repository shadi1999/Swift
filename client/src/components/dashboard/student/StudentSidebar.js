import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu } from 'antd';

const StudentSidebar = () => {
    return (
        <Fragment>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="home">
                    <Link to="/dashboard">
                        <LegacyIcon type="user" />
                    Home</Link>
                </Menu.Item>
                <Menu.Item key="my-classrooms">
                    <Link to="/dashboard/myClassrooms">
                        <LegacyIcon type="video-camera" />
                    My Classrooms</Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
}


export default StudentSidebar;