import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { Menu } from 'antd';

const TutorSidebar = () => {
    return (
        <Fragment>
            <Menu theme="dark" mode="inline" >
                <Menu.Item key="home">
                    <Link to="/dashboard">
                        <LegacyIcon type="user" />
                    Home</Link>
                </Menu.Item>
                <Menu.Item key="my-lectures">
                    <Link to="/dashboard/myClassrooms">
                        <LegacyIcon type="video-camera" />
                        my Classrooms</Link>
                </Menu.Item>
                <Menu.Item key="my-classrooms">
                    <Link to="/dashboard/myLectures">
                        <LegacyIcon type="user" />
                        my lectures</Link>
                </Menu.Item>
            </Menu>
        </Fragment>
    );
}


export default TutorSidebar;