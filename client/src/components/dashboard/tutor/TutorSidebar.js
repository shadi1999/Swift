import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu } from 'antd';
import { HomeOutlined, VideoCameraOutlined } from '@ant-design/icons';


const TutorSidebar = () => {
    return (
        <Fragment>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="home">
                    <Link to="/dashboard">
                        <HomeOutlined />
                    Home</Link>
                </Menu.Item>
                <Menu.Item key="my-classrooms">
                    <Link to="/dashboard/myClassrooms">
                        <VideoCameraOutlined />
                        My Classrooms</Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
}


export default TutorSidebar;