import React, {Fragment}  from 'react';
import {Link} from 'react-router-dom';
import {Menu,Icon} from 'antd';

const AdminSidebar = () =>{
    return(
        <Fragment>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="home">
                    <Link to="/dashboard/admin">
                    <Icon type="user" />
                    Home</Link>
                </Menu.Item>
                <Menu.Item key="tutors-list">
                    <Link to="/dashboard/admin/tutors">
                    <Icon type="user" />
                    Tutors List</Link>
                </Menu.Item>
                <Menu.Item key="students-list">
                    <Link to="/dashboard/admin/students">
                    <Icon type="video-camera" />
                    Students List</Link>
                </Menu.Item>
                <Menu.Item key="add-extra-admin">
                    <Link to="/dashboard/admin/addAdmin">
                    <Icon type="video-camera" />
                    Add an extra admin</Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    )
}


export default AdminSidebar;