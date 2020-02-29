import React, {Fragment}  from 'react';
import {Link} from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu } from 'antd';

const AdminSidebar = () =>{
    return (
        <Fragment>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="home">
                    <Link to="/dashboard/admin">
                    <LegacyIcon type="user" />
                    Home</Link>
                </Menu.Item>
                <Menu.Item key="tutors-list">
                    <Link to="/dashboard/admin/tutors">
                    <LegacyIcon type="user" />
                    Tutors List</Link>
                </Menu.Item>
                <Menu.Item key="students-list">
                    <Link to="/dashboard/admin/students">
                    <LegacyIcon type="video-camera" />
                    Students List</Link>
                </Menu.Item>
                <Menu.Item key="add-extra-admin">
                    <Link to="/dashboard/admin/addAdmin">
                    <LegacyIcon type="video-camera" />
                    Add an extra admin</Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
}


export default AdminSidebar;