import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu } from 'antd';

const AdminSidebar = () => {
    return (
        <Fragment>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="home">
                    <Link to="/dashboard">
                        <LegacyIcon type="user" />
                    Home</Link>
                </Menu.Item>
                <Menu.Item key="tutors-list">
                    <Link to="/dashboard/tutors">
                        <LegacyIcon type="user" />
                    Tutors List</Link>
                </Menu.Item>
                <Menu.Item key="students-list">
                    <Link to="/dashboard/students">
                        <LegacyIcon type="video-camera" />
                    Students List</Link>
                </Menu.Item>
                <Menu.Item key="add-extra-admin">
                    <Link to="/dashboard/addAdmin">
                        <LegacyIcon type="video-camera" />
                    Add an extra admin</Link>
                </Menu.Item>
                <Menu.Item key="add-classroom">
                    <Link to="/dashboard/addClassroom">
                        <LegacyIcon type="video-camera" />
                    Add a classroom</Link>
                </Menu.Item>
                <Menu.Item key="classrooms">
                    <Link to="/dashboard/classrooms">
                        <LegacyIcon type="video-camera" />
                    classrooms</Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
}


export default AdminSidebar;