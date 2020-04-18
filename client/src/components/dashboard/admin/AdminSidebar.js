import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu } from 'antd';
import { VideoCameraAddOutlined } from '@ant-design/icons';

const AdminSidebar = () => {
    return (
        <Fragment>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="home">
                    <Link to="/dashboard">
                        <LegacyIcon type="home" />
                    Home</Link>
                </Menu.Item>
                <Menu.Item key="tutors-list">
                    <Link to="/dashboard/tutors">
                        <LegacyIcon type="team" />
                    Tutors List</Link>
                </Menu.Item>
                <Menu.Item key="students-list">
                    <Link to="/dashboard/students">
                        <LegacyIcon type="team" />
                    Students List</Link>
                </Menu.Item>
                <Menu.Item key="classrooms">
                    <Link to="/dashboard/classrooms">
                        <LegacyIcon type="video-camera" />
                    Classrooms</Link>
                </Menu.Item>
                <Menu.Item key="add-classroom">
                    <Link to="/dashboard/addClassroom">
                        <VideoCameraAddOutlined />
                    New Classroom</Link>
                </Menu.Item>
                <Menu.Item key="add-extra-admin">
                    <Link to="/dashboard/addAdmin">
                        <LegacyIcon type="user-add" />
                    Add an Extra Admin</Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
}


export default AdminSidebar;