import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { List, Card } from 'antd';
import { connect } from 'react-redux';
import { getClassrooms } from '../../../actions/adimnActions';
import { Link } from 'react-router-dom';

const GetClassrooms = ({ getClassrooms, loading, classrooms }) => {
    useEffect(() => {
        getClassrooms();
    }, []);
    return (
        <Fragment>
            <h1>All Classrooms</h1>
            <List
                loading={loading}
                grid={{ gutter: 16, column: 4 }}
                dataSource={classrooms}
                renderItem={item => (
                    <List.Item>
                        <Card title={item.id}><Link to={`/dashboard/classrooms/${item.id}`}>View Classroom Information</Link></Card>
                    </List.Item>
                )}
            />
        </Fragment>
    )
}

GetClassrooms.propTypes = {
    admin: PropTypes.object.isRequired,
    getClassrooms: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    admin: state.auth.user,
    classrooms: state.admin.classrooms,
    loading: state.admin.loading
})

export default connect(mapStateToProps, { getClassrooms })(GetClassrooms);