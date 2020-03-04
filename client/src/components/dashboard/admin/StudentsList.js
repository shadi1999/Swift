import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { List, Avatar, Button, Skeleton } from 'antd';
import {setAlert} from '../../../actions/alert';
import {getStudents} from '../../../actions/adimnActions';


const StudentsList = ({students, loading, getStudents}) => {
    useEffect(() => {
        getStudents();
    }, []);

    return (
        <Skeleton avatar title={false} loading={loading} active>
        <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={students}
            renderItem={item => (
            <List.Item
                actions={[<Link key="student-edit" to={`/dashboard/student/${item._id}`}>edit</Link>]}
            >
                <List.Item.Meta
                    avatar={
                    <Avatar icon={<LegacyIcon type='user' />} />
                    }
                    title={<Link to={`/dashboard/student/${item._id}`}>{item.name}</Link>}
                    //description={`About : ${item.about} `}
                />
            </List.Item>
            )}
      />
    </Skeleton>
    );
}

StudentsList.propTypes = {
    students: PropTypes.array,
    loading: PropTypes.bool,
    getStudents: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    students: state.admin.data,
    loading: state.admin.loading
});

export default connect(
    mapStateToProps, {getStudents}
)(StudentsList);