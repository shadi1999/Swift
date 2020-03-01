import React, { Fragment, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Icon as LegacyIcon } from '@ant-design/compatible';
import { List, Avatar, Button, Skeleton } from 'antd';
import {setAlert} from '../../../actions/alert';
import {getTutors} from '../../../actions/adimnActions';


const TutorsList = ({tutors, loading, getTutors}) => {
    useEffect(() => {
        getTutors();
    }, []);

    return (
        <Skeleton avatar title={false} loading={loading} active>
        <List
            loading={loading}
            itemLayout="horizontal"
            dataSource={tutors}
            renderItem={item => (
            <List.Item
                actions={[<Link key="tutor-edit" to={`/dashboard/admin/tutor/${item._id}`}>edit</Link>]}
            >
                <List.Item.Meta
                    avatar={
                    <Avatar icon={<LegacyIcon type='user' />} />
                    }
                    title={<Link to={`/dashboard/admin/tutor/${item._id}`}>{item.name}</Link>}
                    //description={`About : ${item.about} `}
                />
            </List.Item>
            )}
      />
    </Skeleton>
    );
}

TutorsList.propTypes = {
    tutors: PropTypes.array,
    loading: PropTypes.bool,
    getTutors: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    tutors: state.admin.tutors,
    loading: state.admin.loading
});

export default connect(
    mapStateToProps, {getTutors}
)(TutorsList);