import React, {Fragment}  from 'react';
import {Link} from 'react-router-dom';
import {Menu,Icon} from 'antd';

const AdminSidebar = () =>{
    return(
        <Fragment>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="tutors-list">
                    <Icon type="user" />
                    Tutors List<Link to="/dashboard/admin/tutors"></Link>
                </Menu.Item>
                <Menu.Item key="add-extra-admin">
                    <Icon type="video-camera" />
                    Add an extra admin<Link to="/dashboard/admin/addAdmin"></Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    )
}


export default AdminSidebar;